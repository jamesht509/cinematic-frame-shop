import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

// Allowed origins for CORS
const allowedOrigins = [
  "https://jmpresets.com",
  "https://www.jmpresets.com",
];

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Check request size limit (10KB max)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10000) {
      return new Response(
        JSON.stringify({ error: "Request too large" }),
        { status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) throw new Error("Supabase credentials not set");

    const { priceId, productId, embedded } = await req.json();
    logStep("Request data", { priceId, productId, embedded });

    // Input validation
    if (!priceId || typeof priceId !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid priceId" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate priceId format (Stripe price IDs start with "price_")
    if (!priceId.startsWith("price_")) {
      return new Response(
        JSON.stringify({ error: "Invalid price ID format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate productId if provided
    if (productId && typeof productId !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid productId format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate product exists in database and is active
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data: product, error: productError } = await supabaseClient
      .from("products")
      .select("id, stripe_price_id, is_active")
      .eq("stripe_price_id", priceId)
      .eq("is_active", true)
      .maybeSingle();

    if (productError) {
      logStep("Database error", { error: productError.message });
      return new Response(
        JSON.stringify({ error: "Error validating product" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!product) {
      logStep("Product not found or inactive", { priceId });
      return new Response(
        JSON.stringify({ error: "Product not found or inactive" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    logStep("Product validated", { productId: product.id });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Always use the production domain for redirects
    const redirectOrigin = "https://jmpresets.com";

    // Create checkout session - embedded or redirect mode
    if (embedded) {
      // Embedded checkout mode - returns client_secret
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        ui_mode: "embedded",
        return_url: `${redirectOrigin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
        allow_promotion_codes: true,
        metadata: {
          productId: product.id,
        },
      });

      logStep("Embedded checkout session created", { sessionId: session.id });

      return new Response(JSON.stringify({ 
        clientSecret: session.client_secret,
        sessionId: session.id 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      // Redirect mode (fallback)
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${redirectOrigin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${redirectOrigin}/`,
        billing_address_collection: 'auto',
        allow_promotion_codes: true,
        metadata: {
          productId: product.id,
        },
      });

      logStep("Redirect checkout session created", { sessionId: session.id, url: session.url });

      return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: "An error occurred processing your request" }), {
      headers: { ...getCorsHeaders(req.headers.get("origin")), "Content-Type": "application/json" },
      status: 500,
    });
  }
});

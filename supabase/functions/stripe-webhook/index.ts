import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  try {
    logStep("Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey || !webhookSecret) {
      throw new Error("Missing Stripe configuration");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    const body = await req.text();
    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } catch (err) {
      logStep("Signature verification failed", { error: err });
      return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 400 });
    }

    logStep("Event verified", { type: event.type });

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      logStep("Processing checkout.session.completed", { sessionId: session.id });

      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );

      const customerEmail = session.customer_details?.email || session.metadata?.customerEmail;
      const customerName = session.customer_details?.name || session.metadata?.customerName;
      const productId = session.metadata?.productId;

      logStep("Customer details", { customerEmail, customerName, productId });

      // Get product details
      let productData = null;
      if (productId) {
        const { data: product } = await supabaseClient
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();
        productData = product;
        logStep("Product found", { productData });
      }

      // Create purchase record
      const { data: purchase, error: purchaseError } = await supabaseClient
        .from("purchases")
        .insert({
          customer_email: customerEmail,
          customer_name: customerName,
          product_id: productId,
          amount: (session.amount_total || 0) / 100,
          currency: session.currency?.toUpperCase() || "USD",
          status: "completed",
          stripe_session_id: session.id,
          stripe_payment_intent: typeof session.payment_intent === 'string' ? session.payment_intent : null,
        })
        .select()
        .single();

      if (purchaseError) {
        logStep("Error creating purchase", { error: purchaseError });
      } else {
        logStep("Purchase created", { purchaseId: purchase.id });

        // Send confirmation email
        try {
          const emailResponse = await fetch(
            `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-purchase-email`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
              },
              body: JSON.stringify({
                purchaseId: purchase.id,
                customerEmail,
                customerName,
                productData,
              }),
            }
          );
          logStep("Email function called", { status: emailResponse.status });
        } catch (emailError) {
          logStep("Error calling email function", { error: emailError });
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});

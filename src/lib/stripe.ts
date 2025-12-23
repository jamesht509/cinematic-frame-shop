import { supabase } from "@/integrations/supabase/client";

export interface CheckoutParams {
  priceId: string;
  productId: string;
}

export async function createCheckoutSession(params: CheckoutParams): Promise<string> {
  const { data, error } = await supabase.functions.invoke("create-checkout", {
    body: params,
  });

  if (error) {
    console.error("Error creating checkout session:", error);
    throw new Error(error.message || "Failed to create checkout session");
  }

  if (!data?.url) {
    throw new Error("No checkout URL returned");
  }

  return data.url;
}

export async function verifyPurchase(sessionId: string) {
  // This would verify the purchase status if needed
  // For now, we rely on the webhook to handle purchase confirmation
  return { verified: true };
}

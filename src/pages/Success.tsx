import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, MessageCircle, Video, Home, Loader2, FileText, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ProductInfo {
  name: string;
  download_url: string | null;
  whatsapp_group_url: string | null;
  video_tutorial_url: string | null;
}

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchPurchaseInfo = async () => {
      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        // Get purchase by session ID
        const { data: purchase, error } = await supabase
          .from("purchases")
          .select("product_id, products(*)")
          .eq("stripe_session_id", sessionId)
          .single();

        if (error || !purchase?.products) {
          // If not found yet, retry (webhook might still be processing)
          if (retryCount < 5) {
            setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, 2000);
            return;
          }
          console.error("Error fetching purchase:", error);
        } else {
          const productData = purchase.products as unknown as ProductInfo;
          setProduct(productData);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error:", err);
        setIsLoading(false);
      }
    };

    fetchPurchaseInfo();
  }, [sessionId, retryCount]);

  // After max retries, stop loading
  useEffect(() => {
    if (retryCount >= 5) {
      setIsLoading(false);
    }
  }, [retryCount]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-charcoal-dark via-charcoal to-charcoal-dark flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-gold mx-auto mb-4" />
          <p className="text-white/70">Confirming your payment...</p>
          <p className="text-white/50 text-sm mt-2">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-dark via-charcoal to-charcoal-dark flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="border-gold/30 bg-charcoal/80 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-gold" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Payment Confirmed! 🎉
            </CardTitle>
            <CardDescription className="text-base text-white/70">
              Thank you for your purchase! Your files are ready.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {product?.name && (
              <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 text-center">
                <p className="text-sm text-white/60">Product</p>
                <p className="font-semibold text-lg text-white">{product.name}</p>
              </div>
            )}

            <div className="space-y-3">
              {/* PDF Download - Main CTA */}
              <Link to="/thank-you-pdf" className="block">
                <Button className="w-full h-14 text-lg bg-gold hover:bg-gold-light text-charcoal-dark font-bold">
                  <FileText className="mr-2 h-5 w-5" />
                  Access PDF with Download Links
                </Button>
              </Link>

              {product?.download_url && product.download_url !== '/thank-you-pdf' && (
                <Button asChild variant="outline" className="w-full h-12 border-gold/30 text-gold hover:bg-gold/10">
                  <a href={product.download_url} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Direct Download
                  </a>
                </Button>
              )}

              {product?.video_tutorial_url && (
                <Button asChild variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white/10">
                  <a href={product.video_tutorial_url} target="_blank" rel="noopener noreferrer">
                    <Video className="mr-2 h-5 w-5" />
                    Watch Tutorial
                  </a>
                </Button>
              )}

              {product?.whatsapp_group_url && (
                <Button asChild variant="outline" className="w-full h-12 border-green-500/30 text-green-400 hover:bg-green-500/10">
                  <a href={product.whatsapp_group_url} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Join WhatsApp Group
                  </a>
                </Button>
              )}
            </div>

            <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-gold mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">📧 Check Your Email</h4>
                  <p className="text-sm text-white/70">
                    We sent all links and instructions to your email. 
                    Also check your spam folder.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild variant="ghost" className="w-full text-white/60 hover:text-white hover:bg-white/10">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Store
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
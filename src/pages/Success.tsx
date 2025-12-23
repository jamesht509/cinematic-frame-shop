import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, MessageCircle, Video, Home, Loader2 } from "lucide-react";
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

        if (error) {
          console.error("Error fetching purchase:", error);
        } else if (purchase?.products) {
          const productData = purchase.products as unknown as ProductInfo;
          setProduct(productData);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to allow webhook to process
    setTimeout(fetchPurchaseInfo, 2000);
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Confirmando seu pagamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-500/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="border-green-200 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700">
              Pagamento Confirmado! 🎉
            </CardTitle>
            <CardDescription className="text-base">
              Obrigado pela sua compra! Seus arquivos estão prontos.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {product?.name && (
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Produto</p>
                <p className="font-semibold text-lg">{product.name}</p>
              </div>
            )}

            <div className="space-y-3">
              {product?.download_url && (
                <Button asChild className="w-full h-14 text-lg bg-green-600 hover:bg-green-700">
                  <a href={product.download_url} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Baixar Arquivos
                  </a>
                </Button>
              )}

              {product?.video_tutorial_url && (
                <Button asChild variant="outline" className="w-full h-12">
                  <a href={product.video_tutorial_url} target="_blank" rel="noopener noreferrer">
                    <Video className="mr-2 h-5 w-5" />
                    Assistir Tutorial
                  </a>
                </Button>
              )}

              {product?.whatsapp_group_url && (
                <Button asChild variant="outline" className="w-full h-12 border-green-300 text-green-700 hover:bg-green-50">
                  <a href={product.whatsapp_group_url} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Entrar no Grupo WhatsApp
                  </a>
                </Button>
              )}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-amber-800 mb-2">📧 Verifique seu Email</h4>
              <p className="text-sm text-amber-700">
                Enviamos todos os links e instruções para o seu email. 
                Verifique também a pasta de spam.
              </p>
            </div>

            <div className="pt-4">
              <Button asChild variant="ghost" className="w-full">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Voltar para a Loja
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

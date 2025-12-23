import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Download, MessageCircle, Video, LogOut, Home, Loader2, Package } from "lucide-react";
import { toast } from "sonner";

interface Purchase {
  id: string;
  purchased_at: string;
  amount: number;
  currency: string;
  status: string;
  products: {
    name: string;
    download_url: string | null;
    whatsapp_group_url: string | null;
    video_tutorial_url: string | null;
    image_url: string | null;
  } | null;
}

export default function MyPurchase() {
  const [isLoading, setIsLoading] = useState(true);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login", { state: { from: { pathname: "/minha-compra" } } });
        return;
      }

      setUser(session.user);
      await fetchPurchases(session.user.email);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/login");
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchPurchases = async (email: string | undefined) => {
    if (!email) return;

    try {
      const { data, error } = await supabase
        .from("purchases")
        .select(`
          id,
          purchased_at,
          amount,
          currency,
          status,
          products (
            name,
            download_url,
            whatsapp_group_url,
            video_tutorial_url,
            image_url
          )
        `)
        .eq("customer_email", email)
        .eq("status", "completed")
        .order("purchased_at", { ascending: false });

      if (error) throw error;
      setPurchases(data || []);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      toast.error("Error loading your purchases");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">My Purchases</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Store
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {purchases.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No purchases found</h3>
              <p className="text-muted-foreground mb-4">
                You haven't made any purchases with this email yet.
              </p>
              <Button asChild>
                <Link to="/">View Products</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <Card key={purchase.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {purchase.products?.image_url && (
                    <div className="w-full md:w-48 h-48 bg-muted">
                      <img
                        src={purchase.products.image_url}
                        alt={purchase.products.name || "Product"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle>{purchase.products?.name || "Product"}</CardTitle>
                      <CardDescription>
                        Purchased on {new Date(purchase.purchased_at).toLocaleDateString("en-US")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="flex flex-wrap gap-2">
                        {purchase.products?.download_url && (
                          <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                            <a href={purchase.products.download_url} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 mr-2" />
                              Download Files
                            </a>
                          </Button>
                        )}
                        {purchase.products?.video_tutorial_url && (
                          <Button asChild variant="outline" size="sm">
                            <a href={purchase.products.video_tutorial_url} target="_blank" rel="noopener noreferrer">
                              <Video className="h-4 w-4 mr-2" />
                              Tutorial
                            </a>
                          </Button>
                        )}
                        {purchase.products?.whatsapp_group_url && (
                          <Button asChild variant="outline" size="sm">
                            <a href={purchase.products.whatsapp_group_url} target="_blank" rel="noopener noreferrer">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              WhatsApp
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

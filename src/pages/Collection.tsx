import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ShopifyProductCard } from '@/components/products/ShopifyProductCard';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

const collectionTitles: Record<string, string> = {
  presets: 'Lightroom Presets',
  actions: 'Photoshop Actions',
  bundles: 'Bundle Deals',
  newborn: 'Newborn Photography',
  maternity: 'Maternity Photography',
  wedding: 'Wedding Photography',
  portrait: 'Portrait Photography',
  pets: 'Pet Photography',
  landscape: 'Landscape Photography',
  senior: 'Senior Photography',
  family: 'Family Photography',
};

export default function Collection() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const title = slug ? collectionTitles[slug] || slug.charAt(0).toUpperCase() + slug.slice(1) : 'All Products';

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        // Fetch all products - in a real scenario, you'd filter by collection
        const data = await fetchProducts(20);
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [slug]);

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container-wide">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional digital products to elevate your photography workflow.
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ShopifyProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found in this collection.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

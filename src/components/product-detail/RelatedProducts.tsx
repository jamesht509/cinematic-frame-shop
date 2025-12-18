import { useEffect, useState } from 'react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { ShopifyProductCard } from '@/components/products/ShopifyProductCard';

interface RelatedProductsProps {
  currentProductHandle: string;
}

export function RelatedProducts({ currentProductHandle }: RelatedProductsProps) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts(5);
        // Filter out current product
        const filtered = data.filter(p => p.node.handle !== currentProductHandle);
        setProducts(filtered.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [currentProductHandle]);

  if (loading || products.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            You might also <span className="text-gold italic">love</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore more digital backgrounds to expand your creative toolkit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ShopifyProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

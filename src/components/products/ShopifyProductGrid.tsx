import { useEffect, useState } from 'react';
import { ShopifyProductCard } from './ShopifyProductCard';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { Loader2, PackageX } from 'lucide-react';

interface ShopifyProductGridProps {
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  limit?: number;
}

export function ShopifyProductGrid({
  title = 'Featured Products',
  subtitle,
  columns = 4,
  limit = 20,
}: ShopifyProductGridProps) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts(limit);
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [limit]);

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-4">
                {title.split(' ').map((word, i) =>
                  i === title.split(' ').length - 1 ? (
                    <span key={i} className="text-gradient-gold">{word}</span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20 text-destructive">
            <p>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <PackageX className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground max-w-md">
              Your store doesn't have any products yet. Tell me what products you'd like to add and I'll create them for you!
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && products.length > 0 && (
          <div className={`grid ${gridCols[columns]} gap-6 md:gap-8`}>
            {products.map((product) => (
              <ShopifyProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

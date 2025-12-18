import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { ShopifyProduct } from '@/lib/shopify';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  className?: string;
}

export function ShopifyProductCard({ product, className }: ShopifyProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { node } = product;
  
  const firstImage = node.images.edges[0]?.node;
  const secondImage = node.images.edges[1]?.node;
  const firstVariant = node.variants.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currencyCode = node.priceRange.minVariantPrice.currencyCode;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!firstVariant) return;
    
    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions,
    });
    
    toast.success('Added to cart', {
      description: node.title,
      position: 'top-center',
    });
  };

  return (
    <div className={cn('group relative', className)}>
      <Link to={`/product/${node.handle}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-4">
          {/* Main Image */}
          {firstImage && (
            <img
              src={firstImage.url}
              alt={firstImage.altText || node.title}
              className={cn(
                'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
                secondImage && 'group-hover:opacity-0'
              )}
            />
          )}
          {/* Hover Image */}
          {secondImage && (
            <img
              src={secondImage.url}
              alt={secondImage.altText || node.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}

          {/* Quick Actions */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex gap-2">
              <Button
                className="flex-1 btn-gold"
                onClick={handleAddToCart}
                disabled={!firstVariant?.availableForSale}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                {firstVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/90 backdrop-blur-sm border-border hover:bg-background"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {node.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-serif font-semibold text-lg text-primary">
              {currencyCode} {price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

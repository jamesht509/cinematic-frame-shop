import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

export interface Product {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  hoverImage?: string;
  category: string;
  software: string[];
  badge?: 'bestseller' | 'new' | 'sale';
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className={cn('group relative', className)}>
      <Link to={`/products/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-4">
          {/* Main Image */}
          <img
            src={product.image}
            alt={product.title}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
              product.hoverImage && 'group-hover:opacity-0'
            )}
          />
          {/* Hover Image */}
          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}

          {/* Badge */}
          {product.badge && (
            <Badge
              className={cn(
                'absolute top-3 left-3',
                product.badge === 'bestseller' && 'bg-primary text-primary-foreground',
                product.badge === 'new' && 'bg-green-600 text-white',
                product.badge === 'sale' && 'bg-red-600 text-white'
              )}
            >
              {product.badge === 'sale' ? `${discount}% OFF` : product.badge.toUpperCase()}
            </Badge>
          )}

          {/* Quick Actions */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex gap-2">
              <Button
                className="flex-1 btn-gold"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
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
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-serif font-semibold text-lg text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex gap-1 pt-1">
            {product.software.map((sw) => (
              <span
                key={sw}
                className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground"
              >
                {sw}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

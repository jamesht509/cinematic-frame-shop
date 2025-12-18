import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

interface TopPickProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  software: string[];
}

const topPicks: TopPickProduct[] = [
  {
    id: 'cinematic-portraits',
    title: 'Cinematic Portrait Collection',
    price: 49,
    originalPrice: 79,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviews: 2847,
    badge: 'BESTSELLER',
    software: ['Lightroom', 'Photoshop'],
  },
  {
    id: 'warm-holiday',
    title: 'Warm Holiday Presets',
    price: 39,
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviews: 1523,
    badge: 'NEW',
    software: ['Lightroom'],
  },
  {
    id: 'newborn-soft',
    title: 'Soft Newborn Essentials',
    price: 45,
    originalPrice: 65,
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviews: 892,
    software: ['Lightroom', 'Photoshop'],
  },
  {
    id: 'moody-tones',
    title: 'Moody Tones Pack',
    price: 55,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    reviews: 1204,
    software: ['Lightroom'],
  },
];

export function TopPicks() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Photographers' <span className="text-gradient-gold">Top Picks</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most loved presets, trusted by thousands of professional photographers worldwide.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPicks.map((product) => (
            <TopPickCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="btn-outline-gold group">
            <Link to="/shop">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function TopPickCard({ product }: { product: TopPickProduct }) {
  const handleAddToCart = () => {
    toast.success('Added to cart', {
      description: product.title,
      position: 'top-center',
    });
  };

  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            {product.badge}
          </Badge>
        )}
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button className="btn-gold" onClick={handleAddToCart}>
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
          <h3 className="font-medium line-clamp-1">{product.title}</h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Software Tags */}
        <div className="flex gap-1">
          {product.software.map((sw) => (
            <span key={sw} className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
              {sw}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <span className="font-serif font-semibold text-lg text-primary">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

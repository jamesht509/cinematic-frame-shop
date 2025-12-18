import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

interface TopPickProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
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
    badge: 'BEST SELLER',
    software: ['Lightroom', 'Photoshop'],
  },
  {
    id: 'warm-holiday',
    title: 'Warm Holiday Presets',
    price: 39,
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?q=80&w=600&auto=format&fit=crop',
    badge: 'NEW',
    software: ['Lightroom'],
  },
  {
    id: 'newborn-soft',
    title: 'Soft Newborn Essentials',
    price: 45,
    originalPrice: 65,
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=600&auto=format&fit=crop',
    software: ['Lightroom', 'Photoshop'],
  },
  {
    id: 'moody-tones',
    title: 'Moody Tones Pack',
    price: 55,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop',
    software: ['Lightroom'],
  },
];

export function TopPicks() {
  return (
    <section className="py-10 bg-white">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-gold font-serif italic text-lg mb-2">Our Bestsellers</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal">
            Shop Our Glowing Guides
          </h2>
        </div>

        {/* Products Grid - 4 Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {topPicks.map((product) => (
            <TopPickCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button asChild className="btn-red px-8 py-6">
            <Link to="/shop">
              VIEW ALL PRODUCTS
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function TopPickCard({ product }: { product: TopPickProduct }) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success('Added to cart', {
      description: product.title,
      position: 'top-center',
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badge - Yellow Ribbon */}
        {product.badge && (
          <div className="absolute top-0 left-0">
            <div className="bg-yellow-400 text-charcoal text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
              {product.badge}
            </div>
          </div>
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button 
            className="btn-red px-6 py-3"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            QUICK ADD
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-4 space-y-2">
        <h3 className="font-serif font-semibold text-charcoal text-base line-clamp-1 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Software Tags */}
        <div className="flex gap-1.5">
          {product.software.map((sw) => (
            <span key={sw} className="text-xs px-2 py-0.5 bg-muted text-muted-foreground uppercase tracking-wide">
              {sw}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
          <span className="font-serif font-bold text-lg text-primary">
            ${product.price}
          </span>
        </div>
      </div>
    </Link>
  );
}
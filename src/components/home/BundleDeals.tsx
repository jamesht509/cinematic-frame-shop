import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface Bundle {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  includes: string[];
  savings: string;
}

const bundles: Bundle[] = [
  {
    id: 'ultimate-bundle',
    title: 'Ultimate Portrait Bundle',
    description: 'Everything you need for stunning portraits',
    price: 149,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1505968409348-bd000797c92e?q=80&w=600&auto=format&fit=crop',
    includes: ['50+ Presets', '30+ Actions', '20+ Overlays'],
    savings: 'SAVE 50%',
  },
  {
    id: 'newborn-bundle',
    title: 'Newborn Master Collection',
    description: 'Soft, dreamy edits for newborn photography',
    price: 99,
    originalPrice: 179,
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=600&auto=format&fit=crop',
    includes: ['35+ Presets', '15+ Actions', '10+ Overlays'],
    savings: 'SAVE 45%',
  },
  {
    id: 'holiday-bundle',
    title: 'Holiday Magic Bundle',
    description: 'Create magical holiday memories',
    price: 79,
    originalPrice: 149,
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?q=80&w=600&auto=format&fit=crop',
    includes: ['25+ Presets', '20+ Actions', '15+ Overlays'],
    savings: 'SAVE 47%',
  },
];

export function BundleDeals() {
  return (
    <section className="py-20">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/30">
            LIMITED TIME OFFER
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Bundle <span className="text-gradient-gold">Deals</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get more for less with our curated bundles. Save up to 50% when you buy together.
          </p>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="btn-outline-gold group">
            <Link to="/bundles">
              View All Bundles
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function BundleCard({ bundle }: { bundle: Bundle }) {
  const handleAddToCart = () => {
    toast.success('Added to cart', {
      description: bundle.title,
      position: 'top-center',
    });
  };

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300">
      {/* Savings Badge */}
      <Badge className="absolute top-4 right-4 z-10 bg-red-600 text-white">
        {bundle.savings}
      </Badge>

      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={bundle.image}
          alt={bundle.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-serif font-semibold mb-2">{bundle.title}</h3>
          <p className="text-sm text-muted-foreground">{bundle.description}</p>
        </div>

        {/* Includes */}
        <div className="flex flex-wrap gap-2">
          {bundle.includes.map((item) => (
            <span key={item} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
              {item}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-serif font-bold text-primary">
              ${bundle.price}
            </span>
            <span className="text-lg text-muted-foreground line-through">
              ${bundle.originalPrice}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Button className="w-full btn-gold" onClick={handleAddToCart}>
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

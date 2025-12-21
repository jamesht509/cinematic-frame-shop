import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SectionCTAProps {
  variant?: 'default' | 'highlight' | 'minimal';
  heading?: string;
  subheading?: string;
  price?: string;
  onAddToCart: () => void;
}

export function SectionCTA({ 
  variant = 'default', 
  heading = "Ready to Transform Your Photos?",
  subheading = "Get instant access to 2000+ premium backdrops",
  price = "49",
  onAddToCart 
}: SectionCTAProps) {
  if (variant === 'minimal') {
    return (
      <div className="py-8 text-center">
        <Button 
          onClick={onAddToCart}
          size="lg"
          className="bg-gold hover:bg-gold-light text-charcoal-dark font-semibold text-lg px-8 py-6 h-auto group"
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          Get All This for Just ${price}
          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    );
  }

  if (variant === 'highlight') {
    return (
      <div className="py-12 md:py-16">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-2xl bg-charcoal border border-gold/30 p-8 md:p-12">
            {/* Sparkle effects */}
            <div className="absolute top-4 left-4 text-gold/40">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="absolute bottom-4 right-4 text-gold/40">
              <Sparkles className="h-6 w-6" />
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                {heading}
              </h3>
              <p className="text-white/70 mb-6 max-w-xl mx-auto">
                {subheading}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-gold">${price}</span>
                  <span className="text-lg text-white/50 line-through">$199</span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">75% OFF</span>
                </div>
                
                <Button 
                  onClick={onAddToCart}
                  size="lg"
                  className="bg-gold hover:bg-gold-light text-charcoal-dark font-bold text-lg px-8 py-6 h-auto group animate-pulse hover:animate-none"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Yes! I Want This
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="py-10 bg-charcoal border-y border-charcoal-light">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-1">
              {heading}
            </h3>
            <p className="text-white/60">
              {subheading}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-gold">${price}</span>
            <Button 
              onClick={onAddToCart}
              size="lg"
              className="bg-gold hover:bg-gold-light text-charcoal-dark font-semibold px-6 py-5 h-auto"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

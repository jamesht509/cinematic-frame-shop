import { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ht } from '@/locales/ht/translations';

interface FloatingBuyButtonHTProps {
  price: string;
  currencyCode: string;
  onAddToCart: () => void;
}

export function FloatingBuyButtonHT({ price, currencyCode, onAddToCart }: FloatingBuyButtonHTProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 100vh (hero section)
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      if (scrollY > heroHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in">
      {/* Mobile: Full width bar */}
      <div className="bg-charcoal-dark/95 backdrop-blur-md border-t border-gold/30 shadow-2xl">
        <div className="container-wide py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Price info */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs text-gold font-medium uppercase tracking-wider">{ht.floatingBuy.limitedOffer}</span>
                <span className="h-4 w-px bg-gold/30" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-bold text-white">
                  {currencyCode === 'USD' ? '$' : currencyCode}{parseFloat(price).toFixed(0)}
                </span>
                <span className="text-sm text-white/50 line-through">$199</span>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex items-center gap-2">
              <Button 
                onClick={onAddToCart}
                size="lg"
                className="bg-gold hover:bg-gold-light text-charcoal-dark font-bold text-sm md:text-base px-4 md:px-8 h-12 md:h-14 animate-pulse hover:animate-none"
              >
                <ShoppingBag className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                <span className="hidden sm:inline">{ht.floatingBuy.getAccess}</span>
                <span className="sm:hidden">{ht.floatingBuy.buyNow}</span>
              </Button>
              
              <button
                onClick={() => setIsDismissed(true)}
                className="p-2 text-white/40 hover:text-white/60 transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

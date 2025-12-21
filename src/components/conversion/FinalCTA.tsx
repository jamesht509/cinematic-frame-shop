import { ShoppingBag, Download, Clock, Sparkles, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FinalCTAProps {
  price: string;
  currencyCode: string;
  onAddToCart: () => void;
}

const valueItems = [
  { label: '2000+ Premium Backdrops', value: '$297' },
  { label: 'Exclusive Photoshop Action', value: '$97' },
  { label: '50+ Overlays & Textures', value: '$67' },
  { label: 'Video Tutorials', value: '$47' },
  { label: 'Lifetime Updates', value: 'Priceless' },
];

export function FinalCTA({ price, currencyCode, onAddToCart }: FinalCTAProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-charcoal-dark via-charcoal to-charcoal-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-gold text-sm font-medium">LAST CHANCE • 75% OFF TODAY</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Don't Miss Your Chance to<br />
            <span className="text-gold">Transform Every Photo</span>
          </h2>

          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
            Join 2000+ photographers who are already creating stunning images with our premium backdrops collection
          </p>

          {/* Value Stack */}
          <div className="bg-charcoal border border-charcoal-light rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Here's Everything You Get:</h3>
            
            <div className="space-y-3 mb-6">
              {valueItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-charcoal-light last:border-0">
                  <span className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    {item.label}
                  </span>
                  <span className="text-white/50 line-through text-sm">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gold/30">
              <div className="flex items-center justify-between">
                <span className="text-lg text-white font-medium">Total Value:</span>
                <span className="text-2xl text-white/50 line-through">$508+</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg text-gold font-bold">Today's Price:</span>
                <span className="text-4xl font-bold text-gold">
                  {currencyCode === 'USD' ? '$' : currencyCode}{parseFloat(price).toFixed(0)}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Button 
              onClick={onAddToCart}
              size="lg"
              className="bg-gold hover:bg-gold-light text-charcoal-dark font-bold text-xl px-12 py-8 h-auto w-full md:w-auto animate-pulse hover:animate-none group"
            >
              <ShoppingBag className="h-6 w-6 mr-3" />
              Yes! I Want Instant Access Now
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Instant Download
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Lifetime Access
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                2000+ Happy Customers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

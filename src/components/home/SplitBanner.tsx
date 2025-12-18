import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Play } from 'lucide-react';

const features = [
  'Stunning skin tones that glow',
  'Soft, dreamy light effects',
  'Works with any lighting setup',
];

export function SplitBanner() {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left - Video Placeholder */}
        <div className="aspect-[4/5] lg:aspect-auto relative overflow-hidden bg-charcoal-dark group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop"
            alt="Video thumbnail"
            className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-300"
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
            </div>
          </div>
          {/* Video Label */}
          <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 text-white text-sm font-medium">
            Watch Tutorial
          </div>
        </div>

        {/* Right - Content */}
        <div className="flex items-center p-8 md:p-12 lg:p-16 bg-white">
          <div className="max-w-md">
            {/* Gold Subtitle */}
            <p className="text-gold font-serif italic text-lg mb-4">
              New Collection
            </p>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-6 leading-tight">
              Ready for your most magical editing season yet?
            </h2>

            {/* Features List */}
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button asChild className="btn-red px-8 py-6">
              <Link to="/collections/maternity">
                SHOP MATERNITY COLLECTION
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
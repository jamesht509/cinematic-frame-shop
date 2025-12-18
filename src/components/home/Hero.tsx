import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1512389142860-9c449e58a814?q=80&w=2069&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Card - Magazine Cover Style */}
      <div className="relative z-10 container-wide">
        <div className="max-w-xl mx-auto">
          {/* Overlay Card with Red Gradient */}
          <div className="bg-gradient-to-br from-primary/95 via-primary/90 to-red-deep/95 p-10 md:p-14 text-center">
            {/* Gold Script Subtitle */}
            <p className="font-serif italic text-gold text-lg md:text-xl mb-4">
              Professional Editing Tools
            </p>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight text-white mb-6">
              It's Magic
              <br />
              Season
            </h1>

            {/* Subheadline */}
            <p className="text-white/90 text-base md:text-lg mb-8 leading-relaxed">
              Transform your holiday portraits with our professional 
              Lightroom presets and Photoshop actions.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild className="btn-red bg-white text-primary hover:bg-white/90 px-8 py-6 text-sm">
                <Link to="/shop">
                  SHOP HOLIDAY COLLECTION
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="btn-outline-gold border-gold text-gold hover:bg-gold hover:text-charcoal px-8 py-6"
                asChild
              >
                <Link to="/bundles">
                  VIEW BUNDLES
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
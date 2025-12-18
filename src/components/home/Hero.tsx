import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
      {/* Full-Width Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1512389142860-9c449e58a814?q=80&w=2069&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Centered Content Overlay */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Gold Script Subtitle */}
        <p className="font-serif italic text-gold text-xl md:text-2xl mb-4 animate-fade-in">
          Professional Editing Tools
        </p>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight text-white mb-6 drop-shadow-2xl">
          It's Magic
          <br />
          Season
        </h1>

        {/* Subheadline */}
        <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto">
          Transform your holiday portraits with our professional 
          Lightroom presets and Photoshop actions.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="btn-red px-10 py-6 text-sm">
            <Link to="/shop">
              SHOP HOLIDAY COLLECTION
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            className="btn-outline-gold px-10 py-6"
          >
            <Link to="/bundles">
              VIEW BUNDLES
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
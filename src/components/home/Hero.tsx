import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide text-center pt-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/20 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-cream-muted">Premium Photography Presets</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight">
            Transform Your Photos Into{' '}
            <span className="text-gradient-gold">Cinematic Masterpieces</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-cream-muted max-w-2xl mx-auto leading-relaxed">
            Professional Lightroom presets and Photoshop actions crafted for photographers 
            who refuse to compromise on quality.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild className="btn-gold px-8 py-6 text-base group">
              <Link to="/shop">
                Shop All Presets
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="btn-outline-gold px-8 py-6 text-base group"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 pt-8 text-cream-muted">
            <div className="text-center">
              <p className="text-2xl font-serif font-semibold text-foreground">50K+</p>
              <p className="text-sm">Happy Customers</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-serif font-semibold text-foreground">4.9★</p>
              <p className="text-sm">Average Rating</p>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center hidden sm:block">
              <p className="text-2xl font-serif font-semibold text-foreground">200+</p>
              <p className="text-sm">Premium Presets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
}

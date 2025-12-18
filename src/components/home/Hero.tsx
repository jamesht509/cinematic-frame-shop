import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1512389142860-9c449e58a814?q=80&w=2069&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide text-center pt-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Seasonal Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">It's Magic Season</span>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight">
            Create <span className="text-gradient-gold">Unforgettable</span>
            <br />Holiday Portraits
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-cream-muted max-w-2xl mx-auto leading-relaxed">
            Professional Lightroom presets and Photoshop actions designed to make 
            your holiday sessions truly magical.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild className="btn-gold px-8 py-6 text-base group">
              <Link to="/shop">
                Shop Holiday Collection
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="btn-outline-gold px-8 py-6 text-base"
              asChild
            >
              <Link to="/bundles">
                View Bundles
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-sm text-muted-foreground">50K+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
              <span className="text-sm text-muted-foreground">✓ Instant Download</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
              <span className="text-sm text-muted-foreground">✓ Lightroom & Photoshop</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

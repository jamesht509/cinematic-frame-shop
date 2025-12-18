import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function FounderSection() {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Founder"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary rounded-lg -z-10" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background">
              <span className="text-sm text-muted-foreground">Meet the Creator</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold leading-tight">
              Crafted with Passion,{' '}
              <span className="text-gradient-gold">Perfected Over Years</span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hi, I'm Alexandra — a professional photographer with over 12 years of experience 
                shooting weddings, portraits, and everything in between across the globe.
              </p>
              <p>
                I created Lumière because I was tired of presets that overpromised and 
                underdelivered. Every preset in this collection has been meticulously crafted 
                and tested on thousands of real-world images.
              </p>
              <p>
                My goal is simple: give photographers the tools to create stunning, 
                consistent edits without spending hours behind a screen.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="btn-gold group">
                <Link to="/about">
                  Read My Story
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="btn-outline-gold">
                <Link to="/shop">
                  Browse Collection
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

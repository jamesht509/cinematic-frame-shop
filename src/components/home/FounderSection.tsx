import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Instagram, Youtube, Facebook } from 'lucide-react';

const portfolioImages = [
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=300&auto=format&fit=crop',
];

export function FounderSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Meet The <span className="text-gradient-gold">Founder</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Founder - Alexandra"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 w-40 h-40 border-2 border-primary/50 rounded-xl -z-10" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Hi, I'm <span className="text-foreground font-medium">Alexandra</span> — a professional photographer 
                with over 12 years of experience shooting weddings, portraits, and everything in between.
              </p>
              <p>
                I created Lumière because I was tired of presets that overpromised and 
                underdelivered. Every preset in this collection has been meticulously crafted 
                and tested on thousands of real-world images.
              </p>
              <p>
                My goal is simple: give photographers the tools to create stunning, 
                consistent edits without spending hours behind a screen. Join 50,000+ 
                photographers who trust Lumière for their editing workflow.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>

            {/* CTA Buttons */}
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

        {/* Mini Portfolio Gallery */}
        <div className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioImages.map((src, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={src}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

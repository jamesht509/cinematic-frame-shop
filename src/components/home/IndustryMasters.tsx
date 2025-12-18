import { Star, Quote } from 'lucide-react';

interface Master {
  name: string;
  title: string;
  avatar: string;
  quote: string;
  rating: number;
}

const masters: Master[] = [
  {
    name: 'Sarah Mitchell',
    title: 'Award-Winning Portrait Photographer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    quote: 'These presets have completely transformed my workflow. My clients are absolutely amazed by the results.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    title: 'Professional Wedding Photographer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    quote: 'The quality and consistency of these presets is unmatched. They save me hours of editing time every week.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    title: 'Newborn & Family Specialist',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    quote: 'I recommend Lumière presets to every photographer I mentor. The results speak for themselves.',
    rating: 5,
  },
  {
    name: 'David Thompson',
    title: 'Commercial Photographer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    quote: 'Outstanding quality and incredible support. These presets are worth every penny and then some.',
    rating: 5,
  },
];

export function IndustryMasters() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Endorsed by <span className="text-gradient-gold">Industry Masters</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear what professional photographers have to say about our products
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {masters.map((master, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary/30 mb-4" />

              {/* Quote */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{master.quote}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(master.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={master.avatar}
                  alt={master.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{master.name}</p>
                  <p className="text-xs text-muted-foreground">{master.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

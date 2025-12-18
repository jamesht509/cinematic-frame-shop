import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function FounderSection() {
  return (
    <section className="py-16 bg-charcoal-dark">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          {/* Circular Portrait with Gold Border */}
          <div className="mb-8 inline-block">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-gold overflow-hidden mx-auto">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
                alt="Alexandra - Founder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Meet The Founder
          </h2>

          {/* Bio - Italic Serif */}
          <p className="font-serif italic text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            "I've spent over 12 years behind the camera, capturing life's most precious moments. 
            Every preset in this collection was born from real sessions, real challenges, and a 
            genuine passion for helping photographers create stunning work without endless hours of editing."
          </p>

          {/* Signature */}
          <div className="mb-8">
            <p className="font-serif text-gold text-2xl italic">Alexandra</p>
          </div>

          {/* CTA */}
          <Button asChild className="btn-outline-gold px-8 py-6">
            <Link to="/about">
              READ MY STORY
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
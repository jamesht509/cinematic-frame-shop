import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Wedding Photographer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    content: 'These presets have completely transformed my workflow. My clients are absolutely thrilled with the results, and I\'ve cut my editing time in half.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Portrait Artist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    content: 'The skin tones are absolutely perfect. I\'ve tried dozens of preset packs, and these are by far the most natural-looking while still being dramatic.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Newborn Photographer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
    content: 'Finally, presets that work with the soft lighting of newborn photography! The dreamy tones are exactly what I was looking for.',
    rating: 5,
  },
  {
    id: 4,
    name: 'James Walker',
    role: 'Landscape Photographer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
    content: 'The color grading on these presets is Hollywood-level quality. My landscape shots now have that cinematic look I\'ve always wanted.',
    rating: 5,
  },
];

const mediaLogos = [
  'Lightroom Magazine',
  'Digital Photo Pro',
  'PetaPixel',
  'Fstoppers',
  'SLR Lounge',
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-4">
            Loved by <span className="text-gradient-gold">Photographers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of photographers who have elevated their work with our premium presets.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-card rounded-xl p-8 md:p-12 text-center">
                    {/* Stars */}
                    <div className="flex items-center justify-center gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg md:text-xl text-foreground mb-8 leading-relaxed font-serif italic">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 bg-background"
            onClick={prev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 bg-background"
            onClick={next}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  index === currentIndex
                    ? 'w-6 bg-primary'
                    : 'bg-muted hover:bg-muted-foreground'
                )}
              />
            ))}
          </div>
        </div>

        {/* Media Logos */}
        <div className="mt-16 pt-12 border-t border-border">
          <p className="text-center text-sm text-muted-foreground mb-6">
            As featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {mediaLogos.map((logo) => (
              <span
                key={logo}
                className="text-muted-foreground font-medium text-sm md:text-base opacity-60 hover:opacity-100 transition-opacity"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1594745561149-2211ca8c5d98?w=400&h=500&fit=crop',
    quote: 'These Lightroom presets transformed my maternity photography.',
    highlight: 'The skin tones are flawless and natural!',
    name: 'Diana S',
    badge: 'Verified Customer Review',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=500&fit=crop',
    quote: 'Professional photo editing made simple.',
    highlight: 'Skin retouching takes seconds now',
    afterHighlight: 'with these Photoshop actions. Customer support is exceptional.',
    name: 'Sherine L',
    badge: 'Verified Customer Review',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=400&h=500&fit=crop',
    quote: 'Best newborn photography presets I have ever used. Saved hours of editing time while',
    highlight: 'delivering magazine-quality results to my clients.',
    name: 'Sana I',
    badge: 'Verified Customer Review',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=500&fit=crop&q=80',
    quote: 'Easy-to-follow video tutorials included. These portrait presets let you',
    highlight: 'create stunning edits while keeping your unique style.',
    name: 'Anja M',
    badge: 'Verified Customer Review',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=400&h=500&fit=crop',
    quote: 'Must-have Christmas mini session presets.',
    highlight: 'Fabulous holiday editing workflow',
    afterHighlight: 'that gives my photos a professional edge every time.',
    name: 'Sally M',
    badge: 'Verified Customer Review',
  },
];

export function CustomerTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    ref?.addEventListener('scroll', checkScroll);
    return () => ref?.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-warm-beige" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-4">
            What Our Customers Are Creating
          </h2>
          <p className="text-gold uppercase tracking-widest text-sm font-semibold">
            Professional Photo Editing Results
          </p>
        </header>

        {/* Slider Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center transition-opacity ${
              canScrollLeft ? 'opacity-100 hover:bg-charcoal hover:text-white' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center transition-opacity ${
              canScrollRight ? 'opacity-100 hover:bg-charcoal hover:text-white' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonials Slider */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 px-8 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="list"
            aria-label="Customer testimonials"
          >
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                className="flex-shrink-0 w-72 snap-start"
                role="listitem"
              >
                {/* Image */}
                <figure className="aspect-[4/5] mb-4 overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={`Professional photo editing example by ${testimonial.name} using Lightroom presets and Photoshop actions`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </figure>

                {/* 5-Star Rating */}
                <div className="flex justify-center gap-1 mb-3" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" aria-hidden="true" />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <blockquote className="text-center text-muted-foreground text-sm leading-relaxed mb-3 px-2">
                  <p>
                    "{testimonial.quote}{' '}
                    <strong className="text-charcoal italic">{testimonial.highlight}</strong>
                    {testimonial.afterHighlight && ` ${testimonial.afterHighlight}`}"
                  </p>
                </blockquote>

                {/* Customer Name */}
                <footer className="text-center text-sm">
                  <cite className="not-italic">
                    <span className="text-charcoal font-medium">- {testimonial.name}</span>
                    <span className="text-gold"> | {testimonial.badge}</span>
                  </cite>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

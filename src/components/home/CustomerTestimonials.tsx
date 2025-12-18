import { Star } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1594745561149-2211ca8c5d98?w=400&h=500&fit=crop',
    quote: 'I love that all my images will stay consistent.',
    highlight: 'The portrait skin is AMAZING!',
    name: 'Diana S',
    badge: 'Verified Customer Review',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=500&fit=crop',
    quote: '',
    highlight: 'Skin retouching is now a breeze',
    afterHighlight: 'and I love how easy to use these actions are. The support is superb too"',
    name: 'Sherine L',
    badge: 'Verified Customer Review',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=400&h=500&fit=crop',
    quote: 'Effortlessly brings out the beauty in every image. Not only saved me valuable time and effort but also',
    highlight: 'elevated the quality & aesthetic appeal of my work',
    name: 'Sana I',
    badge: 'Verified Customer Review',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=500&fit=crop&q=80',
    quote: 'Very easy to use and very well explained in the video. You can',
    highlight: 'easily use them and still add your own touch.',
    name: 'Anja M',
    badge: 'Verified Customer Review',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=400&h=500&fit=crop',
    quote: '',
    highlight: 'Fabulous Presets as always,',
    afterHighlight: 'go-to for Christmas Minis the edge!"',
    name: 'Sally M',
    badge: 'Verified Customer Review',
  },
];

export function CustomerTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 md:py-24 bg-warm-beige">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-4">
            What our customers are creating
          </h2>
          <p className="text-gold uppercase tracking-widest text-sm font-semibold">
            WOW WITH YOUR WORKFLOW
          </p>
        </div>

        {/* Testimonials Slider */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-72 snap-start"
            >
              {/* Image */}
              <div className="aspect-[4/5] mb-4 overflow-hidden">
                <img
                  src={testimonial.image}
                  alt={`Work by ${testimonial.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-center text-muted-foreground text-sm leading-relaxed mb-3 px-2">
                "{testimonial.quote}{' '}
                <strong className="text-charcoal italic">{testimonial.highlight}</strong>
                {testimonial.afterHighlight && ` ${testimonial.afterHighlight}`}"
              </p>

              {/* Name */}
              <p className="text-center text-sm">
                <span className="text-charcoal">- {testimonial.name}</span>
                <span className="text-gold"> | {testimonial.badge}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

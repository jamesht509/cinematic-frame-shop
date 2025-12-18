import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const galleryItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=500&h=350&fit=crop',
    quote: 'The glow, light, and magic sparkles are a great way to enhance your images and add that whimsy to your clients galleries while creating rich and timeless photos!',
    author: 'Vanessa K.',
    link: '/shop',
    linkText: 'Shop Christmas',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=500&h=350&fit=crop',
    quote: 'These holiday presets transformed my mini sessions into magical masterpieces. My clients are obsessed with the warm, festive tones!',
    author: 'Michelle R.',
    link: '/shop',
    linkText: 'Shop Holiday',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=500&h=350&fit=crop',
    quote: 'Perfect for creating that cozy Christmas atmosphere. The snow overlays are incredibly realistic and easy to apply.',
    author: 'Sarah T.',
    link: '/shop',
    linkText: 'Shop Winter',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=500&h=350&fit=crop',
    quote: 'My favorite editing toolkit for holiday portraits. The skin tones stay natural while adding that magical Christmas glow.',
    author: 'Jennifer L.',
    link: '/shop',
    linkText: 'Shop Presets',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=500&h=350&fit=crop',
    quote: 'Stunning results every time! These actions save me hours of editing during the busy holiday season.',
    author: 'Amanda P.',
    link: '/shop',
    linkText: 'Shop Actions',
  },
];

export function HolidayGallerySlider() {
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
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    ref?.addEventListener('scroll', checkScroll);
    return () => ref?.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <section className="py-12 bg-charcoal">
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center transition-all ${
            canScrollLeft ? 'opacity-100 hover:bg-white' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Previous images"
        >
          <ChevronLeft className="w-5 h-5 text-charcoal" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center transition-all ${
            canScrollRight ? 'opacity-100 hover:bg-white' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Next images"
        >
          <ChevronRight className="w-5 h-5 text-charcoal" />
        </button>

        {/* Gallery Slider */}
        <div
          ref={scrollRef}
          className="flex gap-1 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-80 h-56 relative group cursor-pointer overflow-hidden"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={`Holiday photography example by ${item.author}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white text-sm leading-relaxed mb-3 line-clamp-4">
                  "{item.quote}"
                </p>

                {/* Author */}
                <p className="text-white font-medium text-sm mb-4">
                  — {item.author}
                </p>

                {/* Link */}
                <Link
                  to={item.link}
                  className="text-gold text-sm font-medium hover:underline inline-flex items-center gap-1"
                >
                  {item.linkText}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

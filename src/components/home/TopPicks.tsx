import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface TopPickProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  rating: number;
  reviews: number;
}

const topPicks: TopPickProduct[] = [
  {
    id: 'christmas-magic',
    title: 'Christmas Magic Photoshop Actions',
    category: 'PHOTOSHOP ACTIONS',
    price: 103,
    originalPrice: 204,
    discount: '50%OFF',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=400&h=500&fit=crop',
    rating: 5,
    reviews: 24,
  },
  {
    id: 'snow-globe-bundle',
    title: 'Snow Globe Digital Background BUNDLE',
    category: 'DIGITAL BACKGROUNDS',
    price: 73,
    originalPrice: 146,
    discount: '50%OFF',
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400&h=500&fit=crop',
    rating: 5,
    reviews: 52,
  },
  {
    id: 'fur-babies',
    title: 'Fur Babies - Photoshop Actions',
    category: 'PHOTOSHOP ACTIONS',
    price: 95,
    originalPrice: 190,
    discount: '50%OFF',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=500&fit=crop',
    rating: 5,
    reviews: 233,
  },
  {
    id: 'hallmark-presets',
    title: 'Evoto Hallmark Christmas Presets',
    category: 'EVOTO PRESETS',
    price: 53,
    originalPrice: 105,
    discount: '50%OFF',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=500&fit=crop',
    rating: 5,
    reviews: 8,
  },
  {
    id: 'holiday-glow',
    title: 'Holiday Glow Lightroom Presets',
    category: 'LIGHTROOM PRESETS',
    price: 46,
    originalPrice: 92,
    discount: '50%OFF',
    image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=400&h=500&fit=crop',
    rating: 4.5,
    reviews: 6,
  },
];

export function TopPicks() {
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
      const scrollAmount = 320;
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
    <section className="py-12 md:py-16 bg-[#f5f5f5]" aria-labelledby="top-picks-heading">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-8">
          <h2 id="top-picks-heading" className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-charcoal mb-3">
            Photographers' top picks
          </h2>
          <p className="text-charcoal uppercase tracking-wider text-sm font-semibold mb-4">
            THE EDITING TOOLS LOVED BY OUR COMMUNITY AT THE BIGGEST SAVING EVER RIGHT NOW
          </p>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-charcoal text-charcoal" />
            ))}
            <span className="text-muted-foreground text-sm ml-2">
              Trusted by 45,000+ professional photographers worldwide
            </span>
          </div>
        </header>

        {/* Slider Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className={`absolute -left-4 md:left-0 top-1/3 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center transition-opacity ${
              canScrollLeft ? 'opacity-100 hover:bg-charcoal hover:text-white' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Previous products"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className={`absolute -right-4 md:right-0 top-1/3 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center transition-opacity ${
              canScrollRight ? 'opacity-100 hover:bg-charcoal hover:text-white' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Next products"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Products Slider */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 px-4 md:px-8 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {topPicks.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex-shrink-0 w-64 snap-start group"
              >
                {/* Image */}
                <div className="aspect-square mb-4 overflow-hidden bg-white">
                  <img
                    src={product.image}
                    alt={`${product.title} - Professional ${product.category.toLowerCase()} for photographers`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Title */}
                <h3 className="font-bold text-charcoal text-base mb-1 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>

                {/* Category */}
                <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">
                  {product.category}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-gold text-gold'
                          : i < product.rating
                          ? 'fill-gold/50 text-gold'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="text-muted-foreground text-sm ml-1">({product.reviews})</span>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground line-through text-sm">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-charcoal font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="bg-primary text-white text-xs font-bold px-2 py-1">
                    {product.discount}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

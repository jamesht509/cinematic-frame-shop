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
    id: 'winter-wonderland',
    title: 'Winter Wonderland Editing Suite',
    category: 'PHOTOSHOP ACTIONS',
    price: 89,
    originalPrice: 178,
    discount: '50%OFF',
    image: 'https://images.unsplash.com/photo-1608096299210-db7e38487075?w=400&h=500&fit=crop',
    rating: 5,
    reviews: 147,
  },
  {
    id: 'festive-bokeh-bundle',
    title: 'Festive Bokeh Overlay Collection',
    category: 'DIGITAL OVERLAYS',
    price: 67,
    originalPrice: 134,
    discount: '50%OFF',
    image: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=400&h=500&fit=crop',
    rating: 5,
    reviews: 89,
  },
  {
    id: 'pet-portrait-pro',
    title: 'Pet Portrait Pro Actions',
    category: 'PHOTOSHOP ACTIONS',
    price: 79,
    originalPrice: 158,
    discount: '50%OFF',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=500&fit=crop',
    rating: 5,
    reviews: 312,
  },
  {
    id: 'golden-hour-presets',
    title: 'Golden Hour Portrait Presets',
    category: 'LIGHTROOM PRESETS',
    price: 59,
    originalPrice: 118,
    discount: '50%OFF',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=500&fit=crop',
    rating: 5,
    reviews: 203,
  },
  {
    id: 'cozy-christmas-pack',
    title: 'Cozy Christmas Editing Pack',
    category: 'COMPLETE BUNDLE',
    price: 99,
    originalPrice: 198,
    discount: '50%OFF',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=400&h=500&fit=crop',
    rating: 4.5,
    reviews: 76,
  },
  {
    id: 'newborn-softglow',
    title: 'Newborn Soft Glow Collection',
    category: 'LIGHTROOM PRESETS',
    price: 69,
    originalPrice: 138,
    discount: '50%OFF',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=500&fit=crop',
    rating: 5,
    reviews: 184,
  },
  {
    id: 'maternity-dreamy',
    title: 'Dreamy Maternity Actions',
    category: 'PHOTOSHOP ACTIONS',
    price: 75,
    originalPrice: 150,
    discount: '50%OFF',
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=400&h=500&fit=crop',
    rating: 5,
    reviews: 156,
  },
  {
    id: 'autumn-magic',
    title: 'Autumn Magic Preset Bundle',
    category: 'COMPLETE BUNDLE',
    price: 109,
    originalPrice: 218,
    discount: '50%OFF',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    rating: 5,
    reviews: 267,
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
            Best-Selling Photo Editing Tools
          </h2>
          <p className="text-charcoal uppercase tracking-wider text-sm font-semibold mb-4">
            PROFESSIONAL PRESETS AND ACTIONS CHOSEN BY THOUSANDS OF PHOTOGRAPHERS WORLDWIDE
          </p>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-charcoal text-charcoal" />
            ))}
            <span className="text-muted-foreground text-sm ml-2">
              Loved by 50,000+ creative professionals globally
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

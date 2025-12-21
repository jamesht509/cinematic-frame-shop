import { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import gallery images for the slider
import goldenCircleMaternity from '@/assets/gallery/golden-circle-maternity.webp';
import pinkRosesArchMaternity from '@/assets/gallery/pink-roses-arch-maternity.webp';
import lavenderMaternity from '@/assets/gallery/lavender-maternity.webp';
import christmasMagic from '@/assets/gallery/christmas-magic.webp';
import fairyLantern from '@/assets/gallery/fairy-lantern.webp';
import tulipBasketNewborn from '@/assets/gallery/tulip-basket-newborn.webp';
import kidsGraduation from '@/assets/gallery/kids-graduation.webp';
import roseArchMaternity from '@/assets/gallery/rose-arch-maternity.webp';

interface ProductHeroSliderProps {
  productTitle: string;
  productPrice: string;
  currencyCode: string;
  onAddToCart: () => void;
}

const sliderImages = [
  { src: goldenCircleMaternity, alt: 'Golden Circle Maternity' },
  { src: pinkRosesArchMaternity, alt: 'Pink Roses Arch' },
  { src: lavenderMaternity, alt: 'Lavender Dreams' },
  { src: christmasMagic, alt: 'Christmas Magic' },
  { src: fairyLantern, alt: 'Fairy Lantern' },
  { src: tulipBasketNewborn, alt: 'Tulip Basket Newborn' },
  { src: kidsGraduation, alt: 'Kids Graduation' },
  { src: roseArchMaternity, alt: 'Rose Arch Maternity' },
];

export function ProductHeroSlider({ 
  productTitle, 
  productPrice, 
  currencyCode, 
  onAddToCart 
}: ProductHeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-charcoal-dark">
      {/* Slides */}
      {sliderImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>
      ))}


      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container-wide">
          <div className="max-w-2xl">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/30">|</span>
              <span className="text-sm text-white/80">500+ Happy Photographers</span>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-gold text-sm font-medium tracking-wide">Digital Download • Instant Access</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-tight mb-6">
              {productTitle || 'Fine Art Backdrops Mega Pack'}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
              Transform any photo into a stunning work of art. 500+ premium digital backdrops for maternity, newborn, graduation, holidays & more.
            </p>

            {/* Price & CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  {currencyCode === 'USD' ? '$' : currencyCode} {parseFloat(productPrice).toFixed(0)}
                </span>
                <span className="text-lg text-white/50 line-through">$199</span>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">75% OFF</span>
              </div>
              
              <Button 
                onClick={onAddToCart}
                size="lg"
                className="bg-gold hover:bg-gold-light text-charcoal-dark font-bold text-lg px-10 py-7 h-auto group shadow-lg shadow-gold/30 animate-pulse hover:animate-none"
              >
                <ShoppingBag className="h-6 w-6 mr-2" />
                Get Instant Access
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-8 text-white/60 text-sm">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                Instant Download
              </span>
              <span>•</span>
              <span>500+ Backdrops</span>
              <span>•</span>
              <span>Lifetime Access</span>
              <span>•</span>
              <span className="text-green-400">7-Day Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentSlide(index);
                setTimeout(() => setIsTransitioning(false), 700);
              }
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-gold' 
                : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-30 hidden md:flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs tracking-widest uppercase rotate-90 origin-center translate-y-8">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent mt-8" />
      </div>
    </section>
  );
}

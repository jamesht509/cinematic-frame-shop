import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1608096299210-db7e38487075?w=1920&h=1080&fit=crop',
    title: 'It\'s Magic Season',
    subtitle: 'Professional Editing Tools',
    description: 'Transform your holiday portraits with our professional Lightroom presets and Photoshop actions loved by 45,000+ photographers worldwide.',
    cta: 'Get started today so you can wow your clients with scroll-stopping galleries in minutes!',
    buttonText: 'SHOP HOLIDAY COLLECTION',
    buttonLink: '/shop',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920&h=1080&fit=crop',
    title: 'Bring Your Creative Vision To Life',
    subtitle: 'Award-Winning Presets',
    description: 'Achieve stunning portrait editing every time, with the award-winning Photoshop Actions, Lightroom & Evoto Presets loved by photographers around the world.',
    cta: 'Get started today so you can wow your clients with scroll-stopping galleries in minutes!',
    buttonText: 'EXPLORE EDITING COLLECTIONS',
    buttonLink: '/shop',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1920&h=1080&fit=crop',
    title: 'Create Dreamy Newborn Portraits',
    subtitle: 'Soft & Natural Edits',
    description: 'Deliver magazine-quality newborn photography with presets designed for soft skin tones, gentle lighting, and timeless aesthetics.',
    cta: 'Join thousands of photographers creating beautiful galleries effortlessly!',
    buttonText: 'SHOP NEWBORN PRESETS',
    buttonLink: '/shop',
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Background Images */}
      {heroSlides.map((s, index) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 z-0 transition-opacity duration-700",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${s.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full min-h-[90vh] flex items-center">
        <div className="max-w-2xl">
          {/* Gold Script Subtitle */}
          <p className={cn(
            "font-serif italic text-gold text-lg md:text-xl mb-4 transition-all duration-500",
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}>
            {slide.subtitle}
          </p>

          {/* Main Headline */}
          <h1 className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold italic leading-tight text-white mb-6 drop-shadow-2xl transition-all duration-500 delay-100",
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}>
            {slide.title}
          </h1>

          {/* Description */}
          <p className={cn(
            "text-white/90 text-base md:text-lg mb-4 leading-relaxed max-w-xl transition-all duration-500 delay-150",
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}>
            {slide.description}
          </p>

          {/* CTA Text */}
          <p className={cn(
            "text-gold font-medium text-sm md:text-base mb-8 transition-all duration-500 delay-200",
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}>
            {slide.cta}
          </p>

          {/* Software Icons + Button */}
          <div className={cn(
            "flex flex-wrap items-center gap-4 transition-all duration-500 delay-250",
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}>
            {/* Software Icons */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#31A8FF] rounded flex items-center justify-center text-white font-bold text-sm">
                Lr
              </div>
              <div className="w-10 h-10 bg-[#31A8FF] rounded flex items-center justify-center text-white font-bold text-sm">
                Ps
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                AI
              </div>
            </div>

            {/* CTA Button */}
            <Button asChild className="btn-gold px-8 py-6 text-sm">
              <Link to={slide.buttonLink}>
                {slide.buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === currentSlide
                ? "bg-gold w-8"
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

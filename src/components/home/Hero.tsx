import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1608096299210-db7e38487075?w=1920&h=1080&fit=crop',
    title: 'Bring Your Creative Vision To Life',
    description: 'Achieve stunning portrait editing every time, with the award-winning Photoshop Actions, Lightroom & Evoto Presets loved by 45,000 photographers around the world.',
    cta: 'Get started today so you can wow your clients with scroll-stopping galleries in minutes!',
    buttonText: 'EXPLORE EDITING COLLECTIONS',
    buttonLink: '/shop',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920&h=1080&fit=crop',
    title: 'Transform Your Holiday Mini Sessions',
    description: 'Create magazine-quality Christmas portraits with our professional editing toolkit. Snow overlays, warm tones, and magical effects included.',
    cta: 'Join thousands of photographers delivering stunning holiday galleries!',
    buttonText: 'SHOP HOLIDAY COLLECTION',
    buttonLink: '/shop',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1920&h=1080&fit=crop',
    title: 'Create Dreamy Newborn Masterpieces',
    description: 'Deliver soft, timeless newborn portraits with presets designed for natural skin tones, gentle lighting, and magazine-worthy aesthetics.',
    cta: 'Start creating beautiful galleries your clients will treasure forever!',
    buttonText: 'SHOP NEWBORN PRESETS',
    buttonLink: '/shop',
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback((index: number, direction: 'left' | 'right') => {
    if (isAnimating || index === currentSlide) return;
    setSlideDirection(direction);
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating, currentSlide]);

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % heroSlides.length;
    goToSlide(next, 'right');
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    goToSlide(prev, 'left');
  }, [currentSlide, goToSlide]);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Slides Container */}
      <div className="relative w-full h-full min-h-[90vh]">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 w-full h-full transition-transform duration-700 ease-out",
              index === currentSlide 
                ? "translate-x-0 z-10" 
                : index < currentSlide || (currentSlide === 0 && index === heroSlides.length - 1 && slideDirection === 'left')
                  ? "-translate-x-full z-0"
                  : "translate-x-full z-0"
            )}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 h-full min-h-[90vh] flex items-center">
              <div className="max-w-3xl">
                {/* Main Headline - Bold Italic Serif */}
                <h1 
                  className={cn(
                    "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold italic leading-[1.1] text-white mb-8 transition-all duration-700",
                    index === currentSlide && !isAnimating
                      ? "opacity-100 translate-x-0"
                      : slideDirection === 'right'
                        ? "opacity-0 translate-x-12"
                        : "opacity-0 -translate-x-12"
                  )}
                  style={{ transitionDelay: index === currentSlide ? '200ms' : '0ms' }}
                >
                  {slide.title}
                </h1>

                {/* Description */}
                <p 
                  className={cn(
                    "text-white text-lg md:text-xl lg:text-2xl mb-6 leading-relaxed max-w-2xl transition-all duration-700",
                    index === currentSlide && !isAnimating
                      ? "opacity-100 translate-x-0"
                      : slideDirection === 'right'
                        ? "opacity-0 translate-x-12"
                        : "opacity-0 -translate-x-12"
                  )}
                  style={{ transitionDelay: index === currentSlide ? '300ms' : '0ms' }}
                >
                  {slide.description}
                </p>

                {/* CTA Text */}
                <p 
                  className={cn(
                    "text-white font-bold text-base md:text-lg mb-10 transition-all duration-700",
                    index === currentSlide && !isAnimating
                      ? "opacity-100 translate-x-0"
                      : slideDirection === 'right'
                        ? "opacity-0 translate-x-12"
                        : "opacity-0 -translate-x-12"
                  )}
                  style={{ transitionDelay: index === currentSlide ? '400ms' : '0ms' }}
                >
                  {slide.cta}
                </p>

                {/* Software Icons + Button */}
                <div 
                  className={cn(
                    "flex flex-wrap items-center gap-4 transition-all duration-700",
                    index === currentSlide && !isAnimating
                      ? "opacity-100 translate-x-0"
                      : slideDirection === 'right'
                        ? "opacity-0 translate-x-12"
                        : "opacity-0 -translate-x-12"
                  )}
                  style={{ transitionDelay: index === currentSlide ? '500ms' : '0ms' }}
                >
                  {/* Software Icons */}
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-[#31A8FF] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      Lr
                    </div>
                    <div className="w-12 h-12 bg-[#31A8FF] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      Ps
                    </div>
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                        evoto
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button asChild className="btn-gold px-8 py-6 text-sm rounded-none">
                    <Link to={slide.buttonLink}>
                      {slide.buttonText}
                      <ArrowDown className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 right-8 md:right-12 z-20 flex items-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index, index > currentSlide ? 'right' : 'left')}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === currentSlide
                ? "bg-gold"
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

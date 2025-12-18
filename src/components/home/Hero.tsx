import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowDown, Trophy, Star, CheckCircle, Camera } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
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

const trustItems = [
  { icon: Trophy, title: 'Multi-Award-Winning', subtitle: 'Editing Tools' },
  { icon: Star, title: 'Trusted By Over', subtitle: '45,000 Customers' },
  { icon: CheckCircle, title: 'Edit Professional Quality', subtitle: 'Galleries Your Clients Will LOVE — Every Time' },
  { icon: Camera, title: 'For Creative Portrait', subtitle: 'Photographers' },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative w-full">
      {/* Main Hero Area */}
      <div className="relative min-h-[85vh] w-full overflow-hidden">
        {/* Slides */}
        <div className="relative w-full h-full min-h-[85vh]">
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
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

              {/* Content */}
              <div className="relative z-10 container mx-auto px-8 md:px-16 h-full min-h-[85vh] flex items-center">
                <div className="max-w-xl">
                  {/* Title - Bold Italic Serif */}
                  <h1 
                    className={cn(
                      "font-serif font-bold italic text-white text-4xl sm:text-5xl md:text-6xl leading-[1.15] mb-6 transition-all duration-700",
                      index === currentSlide && !isAnimating
                        ? "opacity-100 translate-x-0"
                        : slideDirection === 'right'
                          ? "opacity-0 translate-x-8"
                          : "opacity-0 -translate-x-8"
                    )}
                    style={{ transitionDelay: index === currentSlide ? '150ms' : '0ms' }}
                  >
                    {slide.title}
                  </h1>

                  {/* Description - Regular weight */}
                  <p 
                    className={cn(
                      "text-white text-base md:text-lg leading-relaxed mb-4 transition-all duration-700",
                      index === currentSlide && !isAnimating
                        ? "opacity-100 translate-x-0"
                        : slideDirection === 'right'
                          ? "opacity-0 translate-x-8"
                          : "opacity-0 -translate-x-8"
                    )}
                    style={{ transitionDelay: index === currentSlide ? '250ms' : '0ms' }}
                  >
                    {slide.description}
                  </p>

                  {/* CTA Text - Bold */}
                  <p 
                    className={cn(
                      "text-white font-bold text-sm md:text-base mb-6 transition-all duration-700",
                      index === currentSlide && !isAnimating
                        ? "opacity-100 translate-x-0"
                        : slideDirection === 'right'
                          ? "opacity-0 translate-x-8"
                          : "opacity-0 -translate-x-8"
                    )}
                    style={{ transitionDelay: index === currentSlide ? '350ms' : '0ms' }}
                  >
                    {slide.cta}
                  </p>

                  {/* Software Icons + Button */}
                  <div 
                    className={cn(
                      "flex items-center gap-3 transition-all duration-700",
                      index === currentSlide && !isAnimating
                        ? "opacity-100 translate-x-0"
                        : slideDirection === 'right'
                          ? "opacity-0 translate-x-8"
                          : "opacity-0 -translate-x-8"
                    )}
                    style={{ transitionDelay: index === currentSlide ? '450ms' : '0ms' }}
                  >
                    {/* Software Icons */}
                    <div className="flex items-center gap-1.5">
                      {/* Lightroom - Orange/Red */}
                      <div className="w-9 h-9 bg-[#E87E04] rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Lr</span>
                      </div>
                      {/* Photoshop - Blue */}
                      <div className="w-9 h-9 bg-[#31A8FF] rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Ps</span>
                      </div>
                      {/* Evoto */}
                      <div className="w-9 h-9 bg-white rounded flex items-center justify-center">
                        <div className="w-6 h-6 bg-[#4A90D9] rounded flex items-center justify-center">
                          <span className="text-white font-bold text-[8px]">evoto</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button - Gold/Brown */}
                    <Button asChild className="bg-[#B8860B] hover:bg-[#9A7209] text-white px-6 py-5 text-xs font-semibold tracking-wide rounded-none">
                      <Link to={slide.buttonLink}>
                        {slide.buttonText}
                        <ArrowDown className="ml-2 h-3 w-3" />
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
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-16 bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-16 bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Dot Indicators - Bottom Center Right */}
        <div className="absolute bottom-6 right-1/4 z-20 flex items-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index, index > currentSlide ? 'right' : 'left')}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                index === currentSlide
                  ? "bg-white"
                  : "bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-[#2A2A2A] py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4">
            {trustItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <item.icon className="w-6 h-6 text-white/80" strokeWidth={1.5} />
                <div className="text-white">
                  <span className="font-semibold text-sm">{item.title}</span>
                  <br />
                  <span className="text-xs text-white/80">{item.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

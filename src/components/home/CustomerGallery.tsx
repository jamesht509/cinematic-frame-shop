import { useState } from 'react';
import { cn } from '@/lib/utils';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop',
    alt: 'Wedding portrait',
  },
  {
    src: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=400&auto=format&fit=crop',
    alt: 'Newborn photography',
  },
  {
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop',
    alt: 'Portrait session',
  },
  {
    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400&auto=format&fit=crop',
    alt: 'Maternity shoot',
  },
  {
    src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=400&auto=format&fit=crop',
    alt: 'Pet photography',
  },
  {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    alt: 'Professional portrait',
  },
  {
    src: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?q=80&w=400&auto=format&fit=crop',
    alt: 'Holiday portrait',
  },
  {
    src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=400&auto=format&fit=crop',
    alt: 'Lifestyle shot',
  },
];

export function CustomerGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            What Our Customers Are <span className="text-gradient-gold">Creating</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See the stunning work our community creates using our presets and actions.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                'relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300',
                index === 0 || index === 5 ? 'row-span-2' : '',
                hoveredIndex === index ? 'scale-[1.02] z-10' : 'scale-100'
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover aspect-square"
                style={{ aspectRatio: index === 0 || index === 5 ? '1/2' : '1/1' }}
              />
              <div className={cn(
                'absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent transition-opacity duration-300',
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              )}>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm font-medium text-foreground">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-muted-foreground">
            Share your work with <span className="text-primary font-medium">#LumierePresets</span> to be featured
          </p>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { cn } from '@/lib/utils';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop',
    alt: 'Wedding portrait photography',
    large: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=400&h=400&fit=crop',
    alt: 'Newborn photography session',
  },
  {
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
    alt: 'Portrait photography session',
  },
  {
    src: 'https://images.unsplash.com/photo-1623091411395-09e79fdbfcf3?w=400&h=400&fit=crop',
    alt: 'Maternity photo shoot',
  },
  {
    src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
    alt: 'Pet photography session',
  },
];

export function MasonryGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const largeImage = galleryImages[0];
  const smallImages = galleryImages.slice(1);

  return (
    <section className="py-10 bg-cream-warm">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-gold font-serif italic text-lg mb-2">Customer Work</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal">
            What Our Cameras Are Creating
          </h2>
        </div>

        {/* Mosaic Grid - 1 large + 4 small */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Large Image - Left Side */}
          <div
            className="col-span-1 row-span-2 relative overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={largeImage.src}
              alt={largeImage.alt}
              className={cn(
                "w-full h-full object-cover aspect-square md:aspect-auto transition-transform duration-500",
                hoveredIndex === 0 && "scale-105"
              )}
              style={{ minHeight: '100%' }}
            />
          </div>

          {/* 4 Small Images - Right Side (2x2 grid) */}
          {smallImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden cursor-pointer aspect-square"
              onMouseEnter={() => setHoveredIndex(index + 1)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-500",
                  hoveredIndex === index + 1 && "scale-105"
                )}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Share your work with <span className="text-primary font-semibold">#LumierePresets</span> to be featured
          </p>
        </div>
      </div>
    </section>
  );
}
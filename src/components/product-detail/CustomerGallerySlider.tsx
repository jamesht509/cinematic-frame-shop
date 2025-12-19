import { useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Import all gallery images
import christmasMagic from '@/assets/gallery/christmas-magic.webp';
import blossomGarden from '@/assets/gallery/blossom-garden.webp';
import woodlandNest from '@/assets/gallery/woodland-nest.webp';
import royalElegance from '@/assets/gallery/royal-elegance.webp';
import timelessPortrait from '@/assets/gallery/timeless-portrait.webp';
import secretGarden from '@/assets/gallery/secret-garden.webp';
import cozyDreams from '@/assets/gallery/cozy-dreams.webp';
import artisticVision from '@/assets/gallery/artistic-vision.webp';
import renaissanceBeauty from '@/assets/gallery/renaissance-beauty.webp';
import etherealGlow from '@/assets/gallery/ethereal-glow.webp';
import littleScholar from '@/assets/gallery/little-scholar.webp';
import futureLawyer from '@/assets/gallery/future-lawyer.webp';
import unicornFantasy from '@/assets/gallery/unicorn-fantasy.webp';
import lavenderDreams from '@/assets/gallery/lavender-dreams.webp';

const galleryImages = [
  { 
    src: lavenderDreams,
    title: "Lavender Dreams", 
    category: "Maternity" 
  },
  { 
    src: christmasMagic,
    title: "Christmas Magic", 
    category: "Holiday" 
  },
  { 
    src: littleScholar,
    title: "Little Scholar", 
    category: "Graduation" 
  },
  { 
    src: futureLawyer,
    title: "Future Leader", 
    category: "Graduation" 
  },
  { 
    src: unicornFantasy,
    title: "Unicorn Fantasy", 
    category: "Baby" 
  },
  { 
    src: royalElegance,
    title: "Royal Elegance", 
    category: "Maternity" 
  },
  { 
    src: blossomGarden,
    title: "Blossom Garden", 
    category: "Maternity" 
  },
  { 
    src: woodlandNest,
    title: "Woodland Nest", 
    category: "Newborn" 
  },
  { 
    src: secretGarden,
    title: "Secret Garden", 
    category: "Maternity" 
  },
  { 
    src: cozyDreams,
    title: "Cozy Dreams", 
    category: "Newborn" 
  },
  { 
    src: timelessPortrait,
    title: "Timeless Portrait", 
    category: "Fine Art" 
  },
  { 
    src: renaissanceBeauty,
    title: "Renaissance Beauty", 
    category: "Maternity" 
  },
  { 
    src: etherealGlow,
    title: "Ethereal Glow", 
    category: "Maternity" 
  },
  { 
    src: artisticVision,
    title: "Artistic Vision", 
    category: "Fine Art" 
  },
];

export function CustomerGallerySlider() {
  return (
    <section className="py-20 bg-charcoal overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-white mb-4">
            See What You Can <span className="text-gold italic">Create</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Real results from photographers using this collection
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {galleryImages.map((image, index) => (
              <CarouselItem 
                key={index} 
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="group relative aspect-[3/4] overflow-hidden rounded-lg">
                  {/* Image */}
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-gold text-xs font-medium tracking-wider uppercase mb-1 block">
                      {image.category}
                    </span>
                    <h3 className="font-serif text-xl text-white font-medium">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-gold/10 border-gold/30 text-gold hover:bg-gold hover:text-charcoal" />
            <CarouselNext className="static translate-y-0 bg-gold/10 border-gold/30 text-gold hover:bg-gold hover:text-charcoal" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

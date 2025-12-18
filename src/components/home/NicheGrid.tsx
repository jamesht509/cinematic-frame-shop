import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const niches = [
  {
    id: 'newborn',
    title: 'Newborn',
    description: 'Soft, dreamy tones for precious moments',
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=500&auto=format&fit=crop',
    href: '/collections/newborn',
  },
  {
    id: 'maternity',
    title: 'Maternity',
    description: 'Warm, glowing edits for expecting mothers',
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=500&auto=format&fit=crop',
    href: '/collections/maternity',
  },
  {
    id: 'wedding',
    title: 'Wedding',
    description: 'Timeless elegance for the big day',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop',
    href: '/collections/wedding',
  },
  {
    id: 'portrait',
    title: 'Portrait',
    description: 'Stunning skin tones and vibrant colors',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=500&auto=format&fit=crop',
    href: '/collections/portrait',
  },
  {
    id: 'pets',
    title: 'Pets',
    description: 'Capture the personality of furry friends',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=500&auto=format&fit=crop',
    href: '/collections/pets',
  },
  {
    id: 'landscape',
    title: 'Landscape',
    description: 'Dramatic scenes and natural beauty',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=500&auto=format&fit=crop',
    href: '/collections/landscape',
  },
];

export function NicheGrid() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-4">
            Shop by <span className="text-gradient-gold">Style</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect presets for your photography niche. Each collection is carefully crafted for specific styles and lighting conditions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {niches.map((niche, index) => (
            <Link
              key={niche.id}
              to={niche.href}
              className="group relative aspect-[4/5] rounded-lg overflow-hidden card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img
                src={niche.image}
                alt={niche.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {niche.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {niche.description}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-primary/20 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

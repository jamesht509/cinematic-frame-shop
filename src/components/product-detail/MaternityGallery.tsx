import castleMaternity from '@/assets/gallery/castle-maternity.webp';
import redRosesMaternity from '@/assets/gallery/red-roses-maternity.webp';
import ivyArchMaternity from '@/assets/gallery/ivy-arch-maternity.webp';
import goldenCircleMaternity from '@/assets/gallery/golden-circle-maternity.webp';
import softPinkArchMaternity from '@/assets/gallery/soft-pink-arch-maternity.webp';
import pinkRosesArchMaternity from '@/assets/gallery/pink-roses-arch-maternity.webp';
import blondePinkMaternity from '@/assets/gallery/blonde-pink-maternity.webp';
import pinkGardenMaternity from '@/assets/gallery/pink-garden-maternity.webp';
import roseArchMaternity from '@/assets/gallery/rose-arch-maternity.webp';
import goldenRingMaternity from '@/assets/gallery/golden-ring-maternity.webp';
import lavenderMaternity from '@/assets/gallery/lavender-maternity.webp';
import secretGarden from '@/assets/gallery/secret-garden.webp';

const maternityImages = [
  { src: castleMaternity, title: 'Castle Garden', category: 'Fine Art' },
  { src: secretGarden, title: 'Secret Garden', category: 'Nature' },
  { src: redRosesMaternity, title: 'Red Rose Romance', category: 'Romantic' },
  { src: ivyArchMaternity, title: 'Ivy Arch', category: 'Natural' },
  { src: goldenCircleMaternity, title: 'Golden Circle', category: 'Elegant' },
  { src: softPinkArchMaternity, title: 'Soft Pink Arch', category: 'Delicate' },
  { src: pinkRosesArchMaternity, title: 'Pink Roses Arch', category: 'Floral' },
  { src: blondePinkMaternity, title: 'Pink Garden', category: 'Dreamy' },
  { src: pinkGardenMaternity, title: 'Rose Garden', category: 'Classic' },
  { src: roseArchMaternity, title: 'Rose Arch', category: 'Romantic' },
  { src: goldenRingMaternity, title: 'Golden Ring', category: 'Luxury' },
  { src: lavenderMaternity, title: 'Lavender Dreams', category: 'Soft' },
];

export function MaternityGallery() {
  return (
    <section className="py-20 bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-medium tracking-widest uppercase">
            Collection
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mt-2 mb-4">
            Maternity <span className="text-gold italic">Backdrops</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Elegant and romantic backdrops designed for expecting mothers
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {maternityImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl break-inside-avoid"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-gold text-xs font-medium tracking-wider uppercase">
                    {image.category}
                  </span>
                  <h3 className="text-white text-xl font-serif font-medium mt-1">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

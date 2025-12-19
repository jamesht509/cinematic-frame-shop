import woodlandNestNewborn from '@/assets/gallery/woodland-nest-newborn.webp';
import tulipBasketNewborn from '@/assets/gallery/tulip-basket-newborn.webp';
import cozyDreams from '@/assets/gallery/cozy-dreams.webp';
import secretGarden from '@/assets/gallery/secret-garden.webp';

const newbornImages = [
  { src: woodlandNestNewborn, title: 'Woodland Nest', category: 'Natural' },
  { src: tulipBasketNewborn, title: 'Tulip Basket', category: 'Spring' },
  { src: cozyDreams, title: 'Cozy Dreams', category: 'Soft' },
  { src: secretGarden, title: 'Secret Garden', category: 'Floral' },
];

export function NewbornGallery() {
  return (
    <section className="py-20 bg-charcoal">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-medium tracking-widest uppercase">
            Tender Moments
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-white mt-2 mb-4">
            Newborn <span className="text-gold italic">Dreams</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Delicate backdrops for your tiniest clients
          </p>
        </div>

        {/* Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {newbornImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl aspect-[4/3]"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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

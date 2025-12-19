import christmasScene from '@/assets/gallery/christmas-scene.webp';
import christmasBaby from '@/assets/gallery/christmas-baby.webp';
import christmasTreeBaby from '@/assets/gallery/christmas-tree-baby.webp';
import christmasMagic from '@/assets/gallery/christmas-magic.webp';
import halloweenOverlay from '@/assets/gallery/halloween-overlay.webp';

const holidayImages = [
  { src: christmasScene, title: 'Christmas Magic', category: 'Christmas' },
  { src: christmasBaby, title: 'Holiday Baby', category: 'Christmas' },
  { src: christmasTreeBaby, title: 'Tree Time', category: 'Christmas' },
  { src: christmasMagic, title: 'Winter Wonder', category: 'Christmas' },
  { src: halloweenOverlay, title: 'Spooky Night', category: 'Halloween' },
];

export function HolidayGallery() {
  return (
    <section className="py-20 bg-gradient-to-b from-red-950/20 via-charcoal to-green-950/20">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-medium tracking-widest uppercase">
            Seasonal
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-white mt-2 mb-4">
            Holiday <span className="text-gold italic">Collection</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Christmas, Halloween & seasonal celebrations
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-6xl mx-auto">
          {holidayImages.map((image, index) => (
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

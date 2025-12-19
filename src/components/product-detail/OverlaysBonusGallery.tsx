import glitterOverlay from '@/assets/gallery/glitter-overlay.webp';
import smokeOverlay from '@/assets/gallery/smoke-overlay.webp';
import bubblesOverlay from '@/assets/gallery/bubbles-overlay.webp';
import bokehOverlay from '@/assets/gallery/bokeh-overlay.webp';
import balloonsNumbersOverlay from '@/assets/gallery/balloons-numbers-overlay.webp';
import balloonsOverlay from '@/assets/gallery/balloons-overlay.webp';
import bonusSparkles from '@/assets/gallery/bonus-sparkles.webp';
import bonusLights from '@/assets/gallery/bonus-lights.webp';
import patronusOverlay from '@/assets/gallery/patronus-overlay.webp';

const overlayImages = [
  { src: glitterOverlay, title: 'Glitter', category: 'Sparkle' },
  { src: smokeOverlay, title: 'Smoke', category: 'Atmosphere' },
  { src: bubblesOverlay, title: 'Bubbles', category: 'Playful' },
  { src: bokehOverlay, title: 'Bokeh', category: 'Light' },
  { src: balloonsNumbersOverlay, title: 'Numbers', category: 'Birthday' },
  { src: balloonsOverlay, title: 'Balloons', category: 'Celebration' },
  { src: bonusSparkles, title: 'Sparkles', category: 'Magic' },
  { src: bonusLights, title: 'Fairy Lights', category: 'Dreamy' },
  { src: patronusOverlay, title: 'Patronus', category: 'Fantasy' },
];

export function OverlaysBonusGallery() {
  return (
    <section className="py-20 bg-charcoal">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-gold/20 text-gold text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
            Bonus Included
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-white mt-2 mb-4">
            Overlays <span className="text-gold italic">Pack</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Extra elements to enhance your compositions
          </p>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {overlayImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-square bg-black/50"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                  <span className="text-gold text-[10px] font-medium tracking-wider uppercase">
                    {image.category}
                  </span>
                  <h3 className="text-white text-sm font-medium mt-0.5">
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

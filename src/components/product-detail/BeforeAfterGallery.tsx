import { BeforeAfterSlider } from '@/components/products/BeforeAfterSlider';

// Placeholder images for before/after (can be replaced with actual images later)
import renaissanceBeauty from '@/assets/gallery/renaissance-beauty.webp';
import royalElegance from '@/assets/gallery/royal-elegance.webp';
import secretGarden from '@/assets/gallery/secret-garden.webp';
import etherealGlow from '@/assets/gallery/ethereal-glow.webp';

const beforeAfterImages = [
  {
    title: "Renaissance Portrait",
    category: "Fine Art",
    before: renaissanceBeauty,
    after: royalElegance,
  },
  {
    title: "Enchanted Garden",
    category: "Maternity",
    before: secretGarden,
    after: etherealGlow,
  },
];

export function BeforeAfterGallery() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-4">
            Transform Your Images <span className="text-gold italic">Instantly</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Drag to see the magic happen — your photos, our backdrops
          </p>
        </div>

        {/* Before/After Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {beforeAfterImages.map((item, index) => (
            <div key={index} className="space-y-4">
              <BeforeAfterSlider
                beforeImage={item.before}
                afterImage={item.after}
                beforeLabel="Before"
                afterLabel="After"
                className="rounded-lg overflow-hidden shadow-xl"
              />
              <div className="text-center">
                <span className="text-gold text-xs font-medium tracking-wider uppercase">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl text-foreground font-medium mt-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

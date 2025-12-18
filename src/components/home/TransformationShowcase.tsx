import { BeforeAfterSlider } from '@/components/products/BeforeAfterSlider';

const transformations = [
  {
    title: 'Dreamy Newborn',
    beforeImage: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=800&auto=format&fit=crop&sat=-100',
    afterImage: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Pet & Wildlife',
    beforeImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop&sat=-100',
    afterImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Magical Christmas',
    beforeImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=800&auto=format&fit=crop&sat=-100',
    afterImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Frosted Winter',
    beforeImage: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=800&auto=format&fit=crop&sat=-100',
    afterImage: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Stunning Outdoor',
    beforeImage: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?q=80&w=800&auto=format&fit=crop&sat=-100',
    afterImage: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Portraiture',
    beforeImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop&sat=-100',
    afterImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop',
  },
];

export function TransformationShowcase() {
  return (
    <section className="section-charcoal-dark py-16 md:py-24">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-gold font-serif italic text-lg mb-2">See The Difference</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Before & After Magic
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Drag the slider to reveal the stunning transformation our presets deliver
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transformations.map((item, index) => (
            <div key={index} className="group">
              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                beforeLabel="Original"
                afterLabel="Edited"
                className="aspect-[4/3]"
              />
              <h3 className="text-white font-serif text-xl mt-4 text-center group-hover:text-gold transition-colors">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

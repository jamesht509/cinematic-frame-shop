import { BeforeAfterSlider } from '@/components/products/BeforeAfterSlider';

const transformations = [
  {
    id: 1,
    title: 'Moody Portrait',
    before: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop&sat=-100',
    after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    preset: 'Cinematic Moods',
  },
  {
    id: 2,
    title: 'Golden Hour',
    before: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop&sat=-100',
    after: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    preset: 'Warm Glow',
  },
];

export function TransformationShowcase() {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-4">
            See the <span className="text-gradient-gold">Transformation</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Drag the slider to reveal the stunning before and after effects of our premium presets.
          </p>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {transformations.map((item) => (
            <div key={item.id} className="space-y-4">
              <BeforeAfterSlider
                beforeImage={item.before}
                afterImage={item.after}
              />
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-medium">{item.title}</h3>
                <span className="text-sm text-primary">{item.preset}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

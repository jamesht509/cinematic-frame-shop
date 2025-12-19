import { BeforeAfterSlider } from '@/components/products/BeforeAfterSlider';

// Maternity transformations
import pinkMaternityBefore from '@/assets/before-after/pink-maternity-before.jpg';
import pinkMaternityAfter from '@/assets/before-after/pink-maternity-after.jpg';
import roseArchBefore from '@/assets/before-after/rose-arch-before.jpg';
import roseArchAfter from '@/assets/before-after/rose-arch-after.jpg';
import emeraldBefore from '@/assets/before-after/emerald-before.jpg';
import emeraldAfter from '@/assets/before-after/emerald-after.jpg';
import gothicBefore from '@/assets/before-after/gothic-before.jpg';
import gothicAfter from '@/assets/before-after/gothic-after.jpg';

// Celebrations transformations
import graduationBefore from '@/assets/before-after/graduation-before.jpg';
import graduationAfter from '@/assets/before-after/graduation-after.jpg';
import silverDressBefore from '@/assets/before-after/silver-dress-before.jpg';
import silverDressAfter from '@/assets/before-after/silver-dress-after.jpg';
import babyBefore from '@/assets/before-after/baby-before.jpg';
import babyAfter from '@/assets/before-after/baby-after.jpg';
import blueDressBefore from '@/assets/before-after/blue-dress-before.jpg';
import blueDressAfter from '@/assets/before-after/blue-dress-after.jpg';

// Holiday transformations
import santaBefore from '@/assets/before-after/santa-before.jpg';
import santaAfter from '@/assets/before-after/santa-after.jpg';

const transformations = [
  {
    title: 'Blooming Elegance',
    category: 'Maternity',
    beforeImage: pinkMaternityBefore,
    afterImage: pinkMaternityAfter,
  },
  {
    title: 'Enchanted Rose Garden',
    category: 'Maternity',
    beforeImage: roseArchBefore,
    afterImage: roseArchAfter,
  },
  {
    title: 'Golden Hour Magic',
    category: 'Maternity',
    beforeImage: emeraldBefore,
    afterImage: emeraldAfter,
  },
  {
    title: 'Mystic Enchantment',
    category: 'Maternity',
    beforeImage: gothicBefore,
    afterImage: gothicAfter,
  },
  {
    title: 'Proud Graduate',
    category: 'Celebration',
    beforeImage: graduationBefore,
    afterImage: graduationAfter,
  },
  {
    title: 'Midnight Glamour',
    category: 'New Year',
    beforeImage: silverDressBefore,
    afterImage: silverDressAfter,
  },
  {
    title: 'First Birthday Joy',
    category: 'Baby',
    beforeImage: babyBefore,
    afterImage: babyAfter,
  },
  {
    title: 'Birthday Celebration',
    category: 'Portrait',
    beforeImage: blueDressBefore,
    afterImage: blueDressAfter,
  },
  {
    title: 'Santa\'s Magical Forest',
    category: 'Christmas',
    beforeImage: santaBefore,
    afterImage: santaAfter,
  },
];

export function BeforeAfterShowcase() {
  return (
    <section className="py-20 bg-charcoal">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-xs font-medium tracking-widest uppercase rounded-full mb-4">
            Real Client Results
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            See The Magic Unfold
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Drag the slider to reveal the stunning transformation. From simple studio shots to breathtaking art.
          </p>
        </div>

        {/* Grid of Before/After Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transformations.map((item, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-xl">
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  className="aspect-[3/4]"
                />
                {/* Labels */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                  Before
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-gold/80 backdrop-blur-sm rounded-full text-charcoal text-xs font-medium">
                  After
                </div>
              </div>
              {/* Title */}
              <div className="mt-4 text-center">
                <span className="text-gold/80 text-xs uppercase tracking-wider">{item.category}</span>
                <h3 className="text-white font-serif text-lg mt-1">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

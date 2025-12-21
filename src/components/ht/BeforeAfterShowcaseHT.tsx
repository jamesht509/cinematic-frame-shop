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
    title: 'Elegans Floral',
    category: 'Maternity',
    beforeImage: pinkMaternityBefore,
    afterImage: pinkMaternityAfter,
  },
  {
    title: 'Jaden Roz Enchante',
    category: 'Maternity',
    beforeImage: roseArchBefore,
    afterImage: roseArchAfter,
  },
  {
    title: 'Majik Golden Hour',
    category: 'Maternity',
    beforeImage: emeraldBefore,
    afterImage: emeraldAfter,
  },
  {
    title: 'Enchantman Mistik',
    category: 'Maternity',
    beforeImage: gothicBefore,
    afterImage: gothicAfter,
  },
  {
    title: 'Gradye Fyè',
    category: 'Graduation',
    beforeImage: graduationBefore,
    afterImage: graduationAfter,
  },
  {
    title: 'Minwi Glamour',
    category: 'New Year',
    beforeImage: silverDressBefore,
    afterImage: silverDressAfter,
  },
  {
    title: 'Premye Anivèsè',
    category: 'Baby',
    beforeImage: babyBefore,
    afterImage: babyAfter,
  },
  {
    title: 'Selebrasyon Anivèsè',
    category: 'Portrait',
    beforeImage: blueDressBefore,
    afterImage: blueDressAfter,
  },
  {
    title: 'Forè Majik Santa',
    category: 'Christmas',
    beforeImage: santaBefore,
    afterImage: santaAfter,
  },
];

export function BeforeAfterShowcaseHT() {
  return (
    <section className="py-20 bg-charcoal">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-xs font-medium tracking-widest uppercase rounded-full mb-4">
            Rezilta Reyèl Client yo
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Gade sak pase la an
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Pase mouse lan pou w wè gwo chanjman an. Yon senp foto tounen yon chèfèv.
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
                  Anvan
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-gold/80 backdrop-blur-sm rounded-full text-charcoal text-xs font-medium">
                  Aprè
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

import unicornRainbowFantasy from '@/assets/gallery/unicorn-rainbow-fantasy.webp';
import blueHatBaby from '@/assets/gallery/blue-hat-baby.webp';
import fairyLantern from '@/assets/gallery/fairy-lantern.webp';
import goldenReindeer from '@/assets/gallery/golden-reindeer.webp';
import circusBaby from '@/assets/gallery/circus-baby.webp';

const fantasyImages = [
  { src: unicornRainbowFantasy, title: 'Rainbow Unicorn', category: 'Magical' },
  { src: blueHatBaby, title: 'Vintage Whimsy', category: 'Baby Portrait' },
  { src: fairyLantern, title: 'Enchanted Fairy', category: 'Fantasy' },
  { src: goldenReindeer, title: 'Christmas Wish', category: 'Holiday Magic' },
  { src: circusBaby, title: 'Under The Big Top', category: 'Circus' },
];

export function BabyFantasyGallery() {
  return (
    <section className="py-20 bg-gradient-to-b from-pink-50/50 to-purple-50/30 dark:from-pink-950/20 dark:to-purple-950/10">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-medium tracking-widest uppercase">
            Magical Worlds
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mt-2 mb-4">
            Baby & <span className="text-gold italic">Fantasy</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Create enchanted moments for little ones
          </p>
        </div>

        {/* Clean Grid Layout - All same aspect ratio */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {fantasyImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl aspect-[3/4]"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-gold text-[10px] font-medium tracking-wider uppercase">
                    {image.category}
                  </span>
                  <h3 className="text-white text-sm md:text-base font-serif font-medium mt-0.5 leading-tight">
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

import unicornRainbowFantasy from '@/assets/gallery/unicorn-rainbow-fantasy.webp';
import unicornFantasy from '@/assets/gallery/unicorn-fantasy.webp';
import secretGarden from '@/assets/gallery/secret-garden.webp';

const fantasyImages = [
  { src: unicornRainbowFantasy, title: 'Rainbow Unicorn', category: 'Magical' },
  { src: unicornFantasy, title: 'Unicorn Dreams', category: 'Fantasy' },
  { src: secretGarden, title: 'Secret Garden', category: 'Whimsical' },
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

        {/* Featured Large Image + Side Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Large Featured Image */}
          <div className="group relative overflow-hidden rounded-xl aspect-[3/4] lg:row-span-2">
            <img
              src={fantasyImages[0].src}
              alt={fantasyImages[0].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-gold text-xs font-medium tracking-wider uppercase">
                  {fantasyImages[0].category}
                </span>
                <h3 className="text-white text-2xl font-serif font-medium mt-1">
                  {fantasyImages[0].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Side Images */}
          {fantasyImages.slice(1).map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl aspect-[4/3]"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
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

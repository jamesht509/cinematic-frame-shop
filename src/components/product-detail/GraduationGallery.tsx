import kidsGraduation from '@/assets/gallery/kids-graduation.webp';
import lawGraduation from '@/assets/gallery/law-graduation.webp';

const graduationImages = [
  { src: kidsGraduation, title: 'Little Graduate', category: 'Preschool' },
  { src: lawGraduation, title: 'Law School', category: 'University' },
];

export function GraduationGallery() {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-medium tracking-widest uppercase">
            Achievements
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mt-2 mb-4">
            Graduation <span className="text-gold italic">Collection</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Celebrate milestones in style
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {graduationImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl aspect-[3/4]"
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

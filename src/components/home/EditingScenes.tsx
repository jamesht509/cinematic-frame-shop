import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const scenes = [
  {
    id: 'newborn',
    title: 'Newborn',
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=500&auto=format&fit=crop',
    href: '/collections/newborn',
  },
  {
    id: 'senior',
    title: 'Senior',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop',
    href: '/collections/senior',
  },
  {
    id: 'maternity',
    title: 'Maternity',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=500&auto=format&fit=crop',
    href: '/collections/maternity',
  },
  {
    id: 'pets',
    title: 'Pets',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=500&auto=format&fit=crop',
    href: '/collections/pets',
  },
  {
    id: 'wedding',
    title: 'Wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop',
    href: '/collections/wedding',
  },
  {
    id: 'family',
    title: 'Family',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=500&auto=format&fit=crop',
    href: '/collections/family',
  },
];

export function EditingScenes() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Who Are Your <span className="text-gradient-gold">Editing Scenes</span> Today?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect presets for your photography niche
          </p>
        </div>

        {/* Scenes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {scenes.map((scene) => (
            <Link
              key={scene.id}
              to={scene.href}
              className="group relative overflow-hidden rounded-xl aspect-[3/4]"
            >
              <img
                src={scene.image}
                alt={scene.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute inset-0 flex items-end justify-center pb-6">
                <span className="text-lg font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
                  {scene.title}
                </span>
              </div>
              {/* Hover Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-xl transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

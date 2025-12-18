import { Link } from 'react-router-dom';
import { 
  Palette, 
  Sparkles, 
  Sun, 
  Moon, 
  Camera, 
  Layers,
  Wand2,
  ImagePlus
} from 'lucide-react';

const categories = [
  { icon: Palette, label: 'Color Grading', href: '/category/color-grading' },
  { icon: Sparkles, label: 'Light & Airy', href: '/category/light-airy' },
  { icon: Moon, label: 'Moody & Dark', href: '/category/moody' },
  { icon: Sun, label: 'Warm Tones', href: '/category/warm' },
  { icon: Camera, label: 'Film Look', href: '/category/film' },
  { icon: Layers, label: 'Overlays', href: '/category/overlays' },
  { icon: Wand2, label: 'Actions', href: '/category/actions' },
  { icon: ImagePlus, label: 'Composites', href: '/category/composites' },
];

export function CategoryIcons() {
  return (
    <section className="py-16">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">
            Choose by <span className="text-gradient-gold">Category</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Find what you're looking for by editing style
          </p>
        </div>

        {/* Icons Grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.label}
              to={category.href}
              className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-card/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <category.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground text-center transition-colors">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

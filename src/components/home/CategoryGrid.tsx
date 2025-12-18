import { Link } from 'react-router-dom';

const categories = [
  { label: 'Newborn', href: '/category/newborn', image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=400&auto=format&fit=crop' },
  { label: 'Wedding', href: '/category/wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop' },
  { label: 'Portrait', href: '/category/portrait', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop' },
  { label: 'Maternity', href: '/category/maternity', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400&auto=format&fit=crop' },
  { label: 'Outdoor', href: '/category/outdoor', image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?q=80&w=400&auto=format&fit=crop' },
  { label: 'Holiday', href: '/category/holiday', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=400&auto=format&fit=crop' },
  { label: 'Retouch', href: '/category/retouch', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop' },
  { label: 'Film', href: '/category/film', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' },
  { label: 'Moody', href: '/category/moody', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=400&auto=format&fit=crop' },
];

export function CategoryGrid() {
  return (
    <section className="py-10 bg-charcoal-dark">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-gold font-serif italic text-lg mb-2">Find Your Style</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
            Who Are You Editing?
          </h2>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {categories.map((category) => (
            <Link
              key={category.label}
              to={category.href}
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.label}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              />
              {/* Darkening overlay on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300" />
              
              {/* Text at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <span className="text-white font-serif font-semibold text-sm md:text-lg uppercase tracking-wider">
                  {category.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
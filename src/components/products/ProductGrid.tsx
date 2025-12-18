import { ProductCard, Product } from './ProductCard';

const featuredProducts: Product[] = [
  {
    id: 'cinematic-moods',
    title: 'Cinematic Moods Collection',
    price: 49,
    compareAtPrice: 79,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    category: 'Portrait',
    software: ['Lightroom', 'Photoshop'],
    badge: 'bestseller',
  },
  {
    id: 'warm-glow',
    title: 'Warm Glow Preset Pack',
    price: 39,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop',
    category: 'Wedding',
    software: ['Lightroom'],
    badge: 'new',
  },
  {
    id: 'dreamy-newborn',
    title: 'Dreamy Newborn Essentials',
    price: 45,
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=600&auto=format&fit=crop',
    category: 'Newborn',
    software: ['Lightroom', 'Photoshop'],
  },
  {
    id: 'moody-landscapes',
    title: 'Moody Landscapes Bundle',
    price: 55,
    compareAtPrice: 89,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop',
    category: 'Landscape',
    software: ['Lightroom'],
    badge: 'sale',
  },
  {
    id: 'pet-portraits',
    title: 'Pet Portrait Pro',
    price: 35,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop',
    category: 'Pets',
    software: ['Lightroom'],
  },
  {
    id: 'studio-master',
    title: 'Studio Master Collection',
    price: 69,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    category: 'Portrait',
    software: ['Lightroom', 'Photoshop'],
  },
  {
    id: 'maternity-glow',
    title: 'Maternity Glow Pack',
    price: 42,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=600&auto=format&fit=crop',
    category: 'Maternity',
    software: ['Lightroom'],
    badge: 'new',
  },
  {
    id: 'complete-bundle',
    title: 'Complete Master Bundle',
    price: 149,
    compareAtPrice: 299,
    image: 'https://images.unsplash.com/photo-1505968409348-bd000797c92e?q=80&w=600&auto=format&fit=crop',
    category: 'Bundle',
    software: ['Lightroom', 'Photoshop'],
    badge: 'bestseller',
  },
];

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  columns?: 2 | 3 | 4;
}

export function ProductGrid({
  title = 'Featured Products',
  subtitle,
  products = featuredProducts,
  columns = 4,
}: ProductGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-4">
                {title.split(' ').map((word, i) =>
                  i === title.split(' ').length - 1 ? (
                    <span key={i} className="text-gradient-gold">{word}</span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={`grid ${gridCols[columns]} gap-6 md:gap-8`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

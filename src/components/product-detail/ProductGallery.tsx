interface ProductGalleryProps {
  images: Array<{
    node: {
      url: string;
      altText: string | null;
    };
  }>;
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  if (images.length <= 1) return null;

  return (
    <section className="py-16 bg-background">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            Your clients will love these <span className="text-gold italic">final results</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how photographers are using this collection to create stunning images for their clients.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="aspect-square rounded-lg overflow-hidden bg-muted group cursor-pointer"
            >
              <img
                src={image.node.url}
                alt={image.node.altText || `${title} example ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

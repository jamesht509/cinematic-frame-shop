import { Download, Image, FileImage, Layers } from 'lucide-react';

interface WhatIsIncludedProps {
  productTitle: string;
}

export function WhatIsIncluded({ productTitle }: WhatIsIncludedProps) {
  const items = [
    {
      icon: Image,
      title: 'High-Resolution Backgrounds',
      description: 'Multiple stunning backgrounds ready for compositing',
    },
    {
      icon: Layers,
      title: 'PNG Overlays',
      description: 'Transparent overlays to enhance your images',
    },
    {
      icon: FileImage,
      title: 'Quick-Start Guide',
      description: 'Step-by-step instructions to get you started',
    },
    {
      icon: Download,
      title: 'Instant Download',
      description: 'Access your files immediately after purchase',
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            What's in the <span className="text-gold italic">bundle?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create magical images for your clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div 
              key={index}
              className="bg-background p-6 rounded-lg border border-border hover:border-gold/50 transition-colors text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                <item.icon className="h-7 w-7 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

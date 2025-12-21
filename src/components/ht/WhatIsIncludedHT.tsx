import { Download, Image, FileImage, Layers, Video, Users, RefreshCw, Gift } from 'lucide-react';
import { ht } from '@/locales/ht/translations';

interface WhatIsIncludedHTProps {
  productTitle: string;
}

const iconMap = [Image, Layers, Video, Users, RefreshCw, Gift];

export function WhatIsIncludedHT({ productTitle }: WhatIsIncludedHTProps) {
  return (
    <section id="whats-included" className="py-16 bg-muted/30 scroll-mt-24">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            {ht.whatsIncluded.title} <span className="text-gold italic">{ht.whatsIncluded.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {ht.whatsIncluded.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {ht.whatsIncluded.items.map((item, index) => {
            const IconComponent = iconMap[index];
            return (
              <div 
                key={index}
                className="bg-background p-6 rounded-lg border border-border hover:border-gold/50 transition-colors text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                  <IconComponent className="h-7 w-7 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

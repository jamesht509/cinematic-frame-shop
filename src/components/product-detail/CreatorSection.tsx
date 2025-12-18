import { Camera } from 'lucide-react';

export function CreatorSection() {
  return (
    <section className="py-16 bg-charcoal text-white">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <div className="bg-charcoal-light rounded-2xl p-8 md:p-12 border border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gold/20 flex items-center justify-center">
                  <Camera className="h-12 w-12 text-gold" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center md:text-left">
                <span className="text-gold uppercase tracking-widest text-sm font-medium">
                  Meet The Creator
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-semibold mt-3 mb-4">
                  Created by Professional Photographers
                </h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Our digital backgrounds are crafted by experienced photographers who understand 
                  the importance of realistic lighting, perspective, and detail. Each background 
                  is designed to seamlessly blend with your subjects for natural-looking composites.
                </p>
                <p className="text-white/70 leading-relaxed">
                  We're committed to helping photographers create magical images that their 
                  clients will treasure forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

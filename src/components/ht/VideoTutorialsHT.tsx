import { Play, Clock, Lock } from 'lucide-react';
import { ht } from '@/locales/ht/translations';

// Import overlay images for thumbnails
import bokehOverlay from '@/assets/gallery/bokeh-overlay.webp';
import bonusLights from '@/assets/gallery/bonus-lights.webp';
import etherealGlow from '@/assets/gallery/ethereal-glow.webp';
import bonusSparkles from '@/assets/gallery/bonus-sparkles.webp';
import smokeOverlay from '@/assets/gallery/smoke-overlay.webp';
import glitterOverlay from '@/assets/gallery/glitter-overlay.webp';

const thumbnails = [bokehOverlay, bonusLights, etherealGlow, bonusSparkles, smokeOverlay, glitterOverlay];
const durations = ["5 min", "8 min", "12 min", "10 min", "15 min", "7 min"];

export function VideoTutorialsHT() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-charcoal text-white rounded-full text-sm font-medium mb-4">
            {ht.tutorials.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-4">
            {ht.tutorials.title}
          </h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            {ht.tutorials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {ht.tutorials.items.map((tutorial, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Video thumbnail with overlay image */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={thumbnails[index]} 
                  alt={tutorial.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/80 transition-all duration-300">
                    <Play className="h-7 w-7 text-white ml-1" fill="white" />
                  </div>
                </div>
                
                {/* Members Only badge */}
                <div className="absolute top-3 right-3 px-3 py-1.5 bg-charcoal/90 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-1.5">
                  <Lock className="h-3 w-3" />
                  {ht.tutorials.membersOnly}
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {durations[index]}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-charcoal mb-2 group-hover:text-gold transition-colors">
                  {tutorial.title}
                </h3>
                <p className="text-charcoal/60 text-sm">
                  {tutorial.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-10">
          <p className="text-charcoal/60 text-sm flex items-center justify-center gap-2">
            <Lock className="h-4 w-4" />
            {ht.tutorials.accessNote}
          </p>
        </div>
      </div>
    </section>
  );
}

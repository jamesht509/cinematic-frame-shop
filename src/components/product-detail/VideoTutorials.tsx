import { Play, Clock, Lock } from 'lucide-react';

// Import overlay images for thumbnails
import bokehOverlay from '@/assets/gallery/bokeh-overlay.webp';
import bonusLights from '@/assets/gallery/bonus-lights.webp';
import etherealGlow from '@/assets/gallery/ethereal-glow.webp';
import bonusSparkles from '@/assets/gallery/bonus-sparkles.webp';
import smokeOverlay from '@/assets/gallery/smoke-overlay.webp';
import glitterOverlay from '@/assets/gallery/glitter-overlay.webp';

interface Tutorial {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
}

const tutorials: Tutorial[] = [
  {
    id: 1,
    title: "How to Install the Photoshop Action",
    description: "Quick setup guide to get started in minutes",
    duration: "5 min",
    thumbnail: bokehOverlay
  },
  {
    id: 2,
    title: "Applying Your First Backdrop",
    description: "Step-by-step walkthrough of the one-click process",
    duration: "8 min",
    thumbnail: bonusLights
  },
  {
    id: 3,
    title: "Color Matching Techniques",
    description: "Advanced tips for seamless color blending",
    duration: "12 min",
    thumbnail: etherealGlow
  },
  {
    id: 4,
    title: "Working with Overlays",
    description: "How to layer overlays for stunning effects",
    duration: "10 min",
    thumbnail: bonusSparkles
  },
  {
    id: 5,
    title: "Advanced Compositing Tips",
    description: "Pro techniques for realistic compositions",
    duration: "15 min",
    thumbnail: smokeOverlay
  },
  {
    id: 6,
    title: "Export Settings for Print",
    description: "Optimal settings for prints and albums",
    duration: "7 min",
    thumbnail: glitterOverlay
  }
];

export function VideoTutorials() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-charcoal text-white rounded-full text-sm font-medium mb-4">
            🎬 VIDEO TUTORIALS
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-4">
            Step-by-Step Video Guides
          </h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            Learn everything from installation to advanced techniques with our comprehensive video tutorials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tutorials.map((tutorial) => (
            <div 
              key={tutorial.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Video thumbnail with overlay image */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={tutorial.thumbnail} 
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
                  MEMBERS ONLY
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {tutorial.duration}
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
            Access all tutorials instantly after purchase
          </p>
        </div>
      </div>
    </section>
  );
}

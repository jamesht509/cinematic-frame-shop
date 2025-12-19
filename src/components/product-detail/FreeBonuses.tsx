import { Check, Sparkles, Zap, Palette, Video, Users, RefreshCw } from 'lucide-react';

const bonuses = [
  {
    icon: <Sparkles className="h-6 w-6 text-amber-400" />,
    text: "1,900+ Premium Overlays",
    description: "Bokeh, lights, textures, smoke & more"
  },
  {
    icon: <Zap className="h-6 w-6 text-yellow-400" />,
    text: "Exclusive Photoshop Action",
    description: "Apply any backdrop with ONE CLICK",
    highlight: true
  },
  {
    icon: <Palette className="h-6 w-6 text-pink-400" />,
    text: "Premium Presets Collection",
    description: "For Lightroom & Camera Raw"
  },
  {
    icon: <Video className="h-6 w-6 text-blue-400" />,
    text: "Step-by-Step Video Tutorials",
    description: "From beginner to advanced techniques"
  },
  {
    icon: <Users className="h-6 w-6 text-purple-400" />,
    text: "VIP Community Access",
    description: "Connect with fellow photographers"
  },
  {
    icon: <RefreshCw className="h-6 w-6 text-green-400" />,
    text: "1 Year Free Updates",
    description: "New backdrops added regularly"
  }
];

export function FreeBonuses() {
  return (
    <section className="py-16 md:py-24 bg-charcoal relative overflow-hidden">
      {/* Animated gradient background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container-wide relative z-10">
        <div className="text-center mb-12">
          {/* Animated badge */}
          <span className="inline-block px-5 py-2 bg-gradient-to-r from-gold via-amber-400 to-gold bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] text-charcoal rounded-full text-sm font-bold mb-6">
            🎁 FREE BONUSES INCLUDED
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4">
            Everything You Get <span className="text-gold italic">With This Bundle</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            More than just backdrops — a complete toolkit for stunning photography
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bonuses.map((bonus, index) => (
              <div 
                key={index}
                className={`flex items-start gap-4 p-5 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                  bonus.highlight 
                    ? 'bg-gradient-to-r from-gold/20 to-amber-500/10 border-2 border-gold/40' 
                    : 'bg-white/5 border border-white/10 hover:border-gold/30'
                }`}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  {bonus.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${bonus.highlight ? 'text-gold' : 'text-white'}`}>
                    {bonus.text}
                    {bonus.highlight && (
                      <span className="ml-2 inline-block px-2 py-0.5 bg-gold text-charcoal text-xs font-bold rounded-full">
                        EXCLUSIVE
                      </span>
                    )}
                  </h3>
                  <p className="text-white/60 text-sm mt-1">{bonus.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

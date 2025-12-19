import { Check, Sparkles, Zap, Palette, Video, Users, RefreshCw } from 'lucide-react';

const bonuses = [
  {
    emoji: <Sparkles className="h-5 w-5 text-amber-400" />,
    text: "1,900+ Premium Overlays",
    description: "Bokeh, lights, textures, smoke & more"
  },
  {
    emoji: <Zap className="h-5 w-5 text-yellow-400" />,
    text: "Exclusive Photoshop Action",
    description: "Apply any backdrop with ONE CLICK",
    highlight: true
  },
  {
    emoji: <Palette className="h-5 w-5 text-pink-400" />,
    text: "Premium Presets Collection",
    description: "For Lightroom & Camera Raw"
  },
  {
    emoji: <Video className="h-5 w-5 text-blue-400" />,
    text: "Step-by-Step Video Tutorials",
    description: "From beginner to advanced techniques"
  },
  {
    emoji: <Users className="h-5 w-5 text-purple-400" />,
    text: "VIP Community Access",
    description: "Connect with fellow photographers"
  },
  {
    emoji: <RefreshCw className="h-5 w-5 text-green-400" />,
    text: "1 Year Free Updates",
    description: "New backdrops added regularly"
  }
];

export function FreeBonuses() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-medium mb-4">
            🎁 FREE BONUSES INCLUDED
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-4">
            Everything You Get With This Bundle
          </h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            More than just backdrops — a complete toolkit for stunning photography
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="grid gap-4">
              {bonuses.map((bonus, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                    bonus.highlight 
                      ? 'bg-gradient-to-r from-gold/10 to-amber-100 border-2 border-gold/30' 
                      : 'hover:bg-cream/50'
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 bg-charcoal/5 rounded-full flex items-center justify-center">
                    {bonus.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${bonus.highlight ? 'text-gold' : 'text-charcoal'}`}>
                      {bonus.text}
                      {bonus.highlight && (
                        <span className="ml-2 inline-block px-2 py-0.5 bg-gold text-white text-xs rounded-full">
                          EXCLUSIVE
                        </span>
                      )}
                    </h3>
                    <p className="text-charcoal/60 text-sm">{bonus.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

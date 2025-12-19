import { Zap, Clock, Target, Lightbulb, Wand2 } from 'lucide-react';

const features = [
  {
    icon: <Wand2 className="h-6 w-6" />,
    title: "One-Click Magic",
    description: "Apply any backdrop instantly with a single click"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Save Hours",
    description: "Cut your editing time by 90%"
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Auto Color Match",
    description: "Automatic color and light adjustment"
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Universal Compatibility",
    description: "Works with ANY photo, any lighting"
  }
];

export function PhotoshopActionFeature() {
  return (
    <section className="py-20 md:py-28 bg-charcoal relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-wide relative z-10">
        <div className="text-center mb-16">
          {/* Exclusive badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-gold to-amber-500 rounded-full mb-6 animate-pulse">
            <Zap className="h-5 w-5 text-charcoal" />
            <span className="text-charcoal font-bold text-sm tracking-wider">NEVER BEFORE SEEN</span>
            <Zap className="h-5 w-5 text-charcoal" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
            Exclusive <span className="text-gold">Photoshop Action</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-4">
            Apply ANY backdrop with just <span className="text-gold font-bold">ONE CLICK</span>
          </p>
          
          <p className="text-white/60 max-w-2xl mx-auto">
            Revolutionary automation that handles everything — subject extraction, color matching, 
            lighting adjustment, and seamless blending. No manual work required.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-gold/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-gold to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-charcoal group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Video placeholder area */}
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-charcoal to-black rounded-2xl border-2 border-dashed border-gold/30 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mb-4">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-gold border-b-[12px] border-b-transparent ml-1" />
            </div>
            <p className="text-gold font-medium mb-1">Demo Video Coming Soon</p>
            <p className="text-white/40 text-sm">See the Photoshop Action in action</p>
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gold/10 border border-gold/30 rounded-full">
            <Zap className="h-5 w-5 text-gold" />
            <span className="text-gold font-medium">Included FREE with your purchase</span>
          </div>
        </div>
      </div>
    </section>
  );
}

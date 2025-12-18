import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

const features = [
  { text: 'Cut editing time by 70%', emphasis: 'Workflow Velocity:', detail: 'Syncs seamlessly across Photoshop Actions, Lightroom Presets, and Evoto AI for blazing-fast batching.' },
  { text: 'Drag-and-drop Real Snow Overlays, Golden Bokeh, and Festive Fairy Lights to elevate any scene.', emphasis: 'Instant Atmosphere:' },
  { text: 'Deliver consistent, high-end skin tones and timeless backgrounds that convince clients to buy the full gallery.', emphasis: 'Sell The Upgrade:' },
];

export function SplitBanner() {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left - Video Placeholder */}
        <div className="aspect-[4/5] lg:aspect-auto relative overflow-hidden bg-charcoal-dark group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop"
            alt="Video thumbnail"
            className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-300"
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
            </div>
          </div>
          {/* Video Label */}
          <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 text-white text-sm font-medium">
            Watch Tutorial
          </div>
        </div>

        {/* Right - Content */}
        <div className="flex items-center p-8 md:p-12 lg:p-16 bg-white">
          <div className="max-w-lg">
            {/* Limited Time Badge */}
            <span className="inline-block bg-gold text-white text-xs font-bold uppercase tracking-wider px-4 py-2 mb-6">
              LIMITED TIME 50% OFF
            </span>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-4 leading-tight">
              🎄 Ultimate Christmas Editing Toolkit
            </h2>

            {/* Subtitle */}
            <p className="text-gold font-semibold uppercase tracking-wide text-sm mb-4">
              Photoshop, Lightroom & Evoto AI
            </p>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Transform Holiday Mini-Sessions into Magazine-Quality Masterpieces. <strong className="text-charcoal">Fast.</strong>
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Ready for your most profitable season? Stop drowning in editing hours. The Ultimate Holiday Editing Suite is engineered to turn flat RAW files into glowing, irresistible art instantly.
            </p>

            {/* Features Section */}
            <p className="text-gold font-semibold mb-4">🚀 Why Top Photographers Switch:</p>

            {/* Features List */}
            <ul className="space-y-4 mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    <strong className="text-charcoal">{feature.emphasis}</strong> {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Result Text */}
            <p className="text-muted-foreground mb-8 leading-relaxed">
              <span className="text-gold">✨ The Result?</span> You finish early. Your photos look expensive. Your clients are obsessed. Includes exclusive bonus tools for speedy, professional retouching.
            </p>

            {/* CTA Button */}
            <Button asChild className="btn-red px-8 py-6">
              <Link to="/shop">
                GET THE HOLIDAY EDITING PACKS
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Download, PlayCircle, Headphones, Infinity } from 'lucide-react';

const trustItems = [
  { icon: Download, label: 'Instant Download' },
  { icon: PlayCircle, label: 'Video Instructions' },
  { icon: Headphones, label: '24/7 Support' },
  { icon: Infinity, label: 'Lifetime Access' },
];

export function TrustStrip() {
  return (
    <section className="bg-charcoal py-6">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center justify-center gap-3">
              <item.icon className="h-5 w-5 text-gold" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
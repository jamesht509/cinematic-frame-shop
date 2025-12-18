import { Shield, Award, Users, Download, RefreshCw } from 'lucide-react';

const trustItems = [
  { icon: Users, label: '50,000+ Happy Customers' },
  { icon: Download, label: 'Instant Digital Download' },
  { icon: Shield, label: '30-Day Money Back' },
  { icon: Award, label: 'Premium Quality' },
  { icon: RefreshCw, label: 'Free Lifetime Updates' },
];

export function TrustBar() {
  return (
    <section className="py-8 bg-muted/30 border-y border-border/50">
      <div className="container-wide">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-muted-foreground">
              <item.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

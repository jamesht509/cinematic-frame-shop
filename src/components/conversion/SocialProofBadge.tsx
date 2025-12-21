import { Star, Users } from 'lucide-react';

interface SocialProofBadgeProps {
  className?: string;
}

export function SocialProofBadge({ className = '' }: SocialProofBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 ${className}`}>
      {/* Stars */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      
      <span className="text-white/30">|</span>
      
      {/* Buyers */}
      <div className="flex items-center gap-1.5 text-sm text-white/80">
        <Users className="h-4 w-4" />
        <span>500+ Happy Photographers</span>
      </div>
    </div>
  );
}

import { ShieldCheck } from 'lucide-react';
import { ht } from '@/locales/ht/translations';

interface GuaranteeBadgeHTProps {
  variant?: 'inline' | 'block';
}

export function GuaranteeBadgeHT({ variant = 'inline' }: GuaranteeBadgeHTProps) {
  if (variant === 'block') {
    return (
      <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-6 max-w-md mx-auto">
        <div className="flex items-center justify-center gap-3 mb-3">
          <ShieldCheck className="h-8 w-8 text-green-400" />
          <h4 className="text-lg font-semibold text-green-400">{ht.guarantee.title}</h4>
        </div>
        <p className="text-white/70 text-sm text-center">
          {ht.guarantee.description}
        </p>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 text-green-400 text-sm">
      <ShieldCheck className="h-5 w-5" />
      <span className="font-medium">{ht.guarantee.title}</span>
    </div>
  );
}

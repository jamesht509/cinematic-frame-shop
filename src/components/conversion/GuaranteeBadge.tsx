import { Shield, CheckCircle } from 'lucide-react';

interface GuaranteeBadgeProps {
  variant?: 'inline' | 'block';
}

export function GuaranteeBadge({ variant = 'inline' }: GuaranteeBadgeProps) {
  if (variant === 'block') {
    return (
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
              <Shield className="h-10 w-10 text-green-400" />
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white mb-2">
              7-Day Money Back Guarantee
            </h4>
            <p className="text-white/70 mb-4">
              Not satisfied? No problem. We offer a full refund within 7 days of purchase. 
              No questions asked. Your satisfaction is our priority.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-green-400">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Risk-Free Purchase
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Instant Refund
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                No Questions Asked
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Inline variant
  return (
    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
      <Shield className="h-4 w-4 text-green-400" />
      <span className="text-sm text-green-400 font-medium">7-Day Money Back Guarantee</span>
    </div>
  );
}

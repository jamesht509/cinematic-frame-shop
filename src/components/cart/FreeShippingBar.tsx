import { Truck, Check } from 'lucide-react';
import { useCartSubtotal } from '@/stores/cartStore';
import { Progress } from '@/components/ui/progress';

const FREE_SHIPPING_THRESHOLD = 99;

export function FreeShippingBar() {
  const subtotal = useCartSubtotal();
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const hasQualified = remaining <= 0;

  return (
    <div className="px-4 py-3 bg-secondary/50 border-b border-border">
      <div className="flex items-center gap-2 mb-2">
        {hasQualified ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Truck className="h-4 w-4 text-primary" />
        )}
        <span className="text-sm">
          {hasQualified ? (
            <span className="text-green-500 font-medium">
              You've unlocked free shipping!
            </span>
          ) : (
            <>
              Add <span className="font-semibold text-primary">${remaining.toFixed(2)}</span> more for free shipping
            </>
          )}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}

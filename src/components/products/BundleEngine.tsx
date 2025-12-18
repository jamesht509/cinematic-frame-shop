import { Link } from 'react-router-dom';
import { ShoppingBag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface BundleItem {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface BundleEngineProps {
  mainProduct: BundleItem;
  recommendations: BundleItem[];
}

export function BundleEngine({ mainProduct, recommendations }: BundleEngineProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([mainProduct.id]);
  const { addItem } = useCart();

  const allItems = [mainProduct, ...recommendations];
  const selectedProducts = allItems.filter((item) => selectedItems.includes(item.id));
  const totalPrice = selectedProducts.reduce((sum, item) => sum + item.price, 0);
  const bundleDiscount = selectedProducts.length >= 3 ? 0.15 : selectedProducts.length >= 2 ? 0.1 : 0;
  const discountedTotal = totalPrice * (1 - bundleDiscount);

  const toggleItem = (id: string) => {
    if (id === mainProduct.id) return; // Can't deselect main product
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddBundle = () => {
    selectedProducts.forEach((product) => {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price * (1 - bundleDiscount),
        image: product.image,
        variant: bundleDiscount > 0 ? `Bundle: ${Math.round(bundleDiscount * 100)}% off` : undefined,
      });
    });
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-serif font-semibold mb-4">
        Frequently Bought Together
      </h3>

      {/* Products Row */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {allItems.map((item, index) => (
          <div key={item.id} className="flex items-center shrink-0">
            {index > 0 && <Plus className="h-4 w-4 mx-2 text-muted-foreground" />}
            <button
              onClick={() => toggleItem(item.id)}
              className={cn(
                'relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                selectedItems.includes(item.id)
                  ? 'border-primary'
                  : 'border-border opacity-50'
              )}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {selectedItems.includes(item.id) && (
                <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">✓</span>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Items List */}
      <ul className="space-y-3 mb-6">
        {allItems.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <Checkbox
              id={`bundle-${item.id}`}
              checked={selectedItems.includes(item.id)}
              onCheckedChange={() => toggleItem(item.id)}
              disabled={item.id === mainProduct.id}
            />
            <label
              htmlFor={`bundle-${item.id}`}
              className={cn(
                'flex-1 text-sm cursor-pointer',
                !selectedItems.includes(item.id) && 'text-muted-foreground'
              )}
            >
              {item.title}
            </label>
            <span className="text-sm font-medium">${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {/* Total */}
      <div className="border-t border-border pt-4 space-y-2">
        {bundleDiscount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-500">Bundle Discount ({Math.round(bundleDiscount * 100)}%)</span>
            <span className="text-green-500">-${(totalPrice * bundleDiscount).toFixed(2)}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="font-medium">Total ({selectedProducts.length} items)</span>
          <div className="text-right">
            {bundleDiscount > 0 && (
              <span className="text-sm text-muted-foreground line-through mr-2">
                ${totalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xl font-serif font-semibold text-primary">
              ${discountedTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <Button
        className="w-full mt-4 btn-gold py-6"
        onClick={handleAddBundle}
      >
        <ShoppingBag className="h-4 w-4 mr-2" />
        Add Selected to Cart
      </Button>
    </div>
  );
}

// Default demo data
export function BundleEngineDemo() {
  const mainProduct = {
    id: 'cinematic-moods',
    title: 'Cinematic Moods Collection',
    price: 49,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop',
  };

  const recommendations = [
    {
      id: 'warm-glow',
      title: 'Warm Glow Preset Pack',
      price: 39,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 'studio-master',
      title: 'Studio Master Collection',
      price: 69,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    },
  ];

  return <BundleEngine mainProduct={mainProduct} recommendations={recommendations} />;
}

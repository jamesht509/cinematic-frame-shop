import { X, Plus, Minus, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, useCartSubtotal } from '@/stores/cartStore';
import { FreeShippingBar } from './FreeShippingBar';

export function CartDrawer() {
  const {
    items,
    isOpen,
    isLoading,
    closeCart,
    updateQuantity,
    removeItem,
    createCheckout,
  } = useCartStore();
  const subtotal = useCartSubtotal();

  const handleCheckout = async () => {
    const checkoutUrl = await createCheckout();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-serif font-semibold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Free Shipping Bar */}
        <FreeShippingBar />

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button className="btn-gold" onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.variantId}
                  className="flex gap-4 p-4 bg-background rounded-lg"
                >
                  <div className="w-20 h-20 rounded overflow-hidden bg-muted shrink-0">
                    {item.product.node.images?.edges?.[0]?.node && (
                      <img
                        src={item.product.node.images.edges[0].node.url}
                        alt={item.product.node.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">
                      {item.product.node.title}
                    </h3>
                    {item.variantTitle !== 'Default Title' && (
                      <p className="text-sm text-muted-foreground">{item.variantTitle}</p>
                    )}
                    <p className="text-primary font-medium mt-1">
                      {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.variantId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium">Subtotal</span>
              <span className="font-serif font-semibold">
                {items[0]?.price.currencyCode || '$'} {subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Taxes and shipping calculated at checkout
            </p>
            <Button 
              className="w-full btn-gold py-6 text-base" 
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Checkout...
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Checkout
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

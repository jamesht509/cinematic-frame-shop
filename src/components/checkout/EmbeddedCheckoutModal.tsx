import { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { X, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_live_51ShCjpDpQeuTAAl5UUjFW9MqAPMmMNL6WjhcDZsrJiQdAKr2VnbxiInPGsmE6FXfGk3jFifRY2B4k10W2rXGRMH900d5PUTClB');

interface EmbeddedCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  priceId: string;
  productId: string;
}

export function EmbeddedCheckoutModal({ 
  isOpen, 
  onClose, 
  priceId, 
  productId 
}: EmbeddedCheckoutModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  const fetchClientSecret = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          priceId, 
          productId,
          embedded: true 
        },
      });

      if (error) throw error;
      if (!data?.clientSecret) throw new Error('No client secret returned');

      setIsLoading(false);
      return data.clientSecret;
    } catch (err) {
      console.error('Error fetching client secret:', err);
      setIsLoading(false);
      throw err;
    }
  }, [priceId, productId]);

  const options = { fetchClientSecret };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Fechar"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Checkout content */}
        <div className="h-[80vh] overflow-auto">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center">
                <Loader2 className="h-10 w-10 animate-spin text-gold mx-auto mb-3" />
                <p className="text-gray-600">Carregando checkout seguro...</p>
              </div>
            </div>
          )}
          
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={options}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </div>
  );
}
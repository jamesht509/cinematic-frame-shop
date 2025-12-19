import { useState } from 'react';
import { ShoppingBag, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import productHeroMain from '@/assets/product-hero-main.png';

interface ProductHeroProps {
  product: {
    title: string;
    description: string;
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
  selectedVariant: string | null;
  onVariantChange: (variantId: string) => void;
  onAddToCart: () => void;
}

export function ProductHero({ product, selectedVariant, onVariantChange, onAddToCart }: ProductHeroProps) {
  const currentVariant = product.variants.edges.find(v => v.node.id === selectedVariant)?.node;

  const features = [
    'Instant Digital Download',
    'High Resolution Files',
    'Easy to Use with Any Software',
    'Lifetime Access',
  ];

  return (
    <section className="bg-charcoal text-white py-12 lg:py-20">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left - Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-charcoal-light shadow-2xl">
              <img
                src={productHeroMain}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Badge */}
            <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-sm font-medium rounded">
              Digital Download
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-white/70 text-sm">Based on customer reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-serif text-gold">
                {currentVariant?.price.currencyCode} {parseFloat(currentVariant?.price.amount || '0').toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="text-white/80 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-white/80">
                  <Check className="h-5 w-5 text-gold flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Variants */}
            {product.options.length > 0 && product.options[0].name !== 'Title' && (
              <div className="space-y-4">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <label className="block text-sm font-medium mb-2 text-white/70">{option.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const variant = product.variants.edges.find(v =>
                          v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                        );
                        const isSelected = selectedVariant === variant?.node.id;
                        return (
                          <button
                            key={value}
                            onClick={() => variant && onVariantChange(variant.node.id)}
                            className={`px-4 py-2 rounded border transition-colors ${
                              isSelected
                                ? 'border-gold bg-gold/20 text-gold'
                                : 'border-white/30 hover:border-gold text-white/70'
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            <Button
              className="w-full btn-gold py-6 text-lg"
              onClick={onAddToCart}
              disabled={!currentVariant?.availableForSale}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              {currentVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
            </Button>

            {/* Trust Badge */}
            <p className="text-center text-white/50 text-sm">
              Secure checkout • Instant delivery to your email
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

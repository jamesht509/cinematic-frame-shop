import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useCartStore } from '@/stores/cartStore';
import { fetchProductByHandle } from '@/lib/shopify';
import { toast } from 'sonner';

interface ProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
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
}

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ProductNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      try {
        setLoading(true);
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        if (data?.variants.edges[0]) {
          setSelectedVariant(data.variants.edges[0].node.id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;
    
    const variant = product.variants.edges.find(v => v.node.id === selectedVariant)?.node;
    if (!variant) return;

    addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
    
    toast.success('Added to cart', {
      description: product.title,
      position: 'top-center',
    });
  };

  const currentVariant = product?.variants.edges.find(v => v.node.id === selectedVariant)?.node;

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center pt-20">
          <h1 className="text-2xl font-serif mb-4">Product not found</h1>
          <Link to="/">
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container-wide">
          {/* Breadcrumb */}
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                {product.images.edges[selectedImage]?.node && (
                  <img
                    src={product.images.edges[selectedImage].node.url}
                    alt={product.images.edges[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {product.images.edges.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.edges.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded overflow-hidden bg-muted ${
                        selectedImage === index ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <img
                        src={image.node.url}
                        alt={image.node.altText || ''}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
                  {product.title}
                </h1>
                <p className="text-2xl font-serif text-primary">
                  {currentVariant?.price.currencyCode} {parseFloat(currentVariant?.price.amount || '0').toFixed(2)}
                </p>
              </div>

              {/* Variants */}
              {product.options.length > 0 && product.options[0].name !== 'Title' && (
                <div className="space-y-4">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="block text-sm font-medium mb-2">{option.name}</label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const variant = product.variants.edges.find(v =>
                            v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                          );
                          const isSelected = selectedVariant === variant?.node.id;
                          return (
                            <button
                              key={value}
                              onClick={() => variant && setSelectedVariant(variant.node.id)}
                              className={`px-4 py-2 rounded border transition-colors ${
                                isSelected
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-border hover:border-primary'
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

              {/* Description */}
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {/* Add to Cart */}
              <Button
                className="w-full btn-gold py-6 text-lg"
                onClick={handleAddToCart}
                disabled={!currentVariant?.availableForSale}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                {currentVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useCartStore } from '@/stores/cartStore';
import { fetchProductByHandle } from '@/lib/shopify';
import { toast } from 'sonner';

import { ProductHero } from '@/components/product-detail/ProductHero';
import { MaternityGallery } from '@/components/product-detail/MaternityGallery';
import { NewbornGallery } from '@/components/product-detail/NewbornGallery';
import { GraduationGallery } from '@/components/product-detail/GraduationGallery';
import { BabyFantasyGallery } from '@/components/product-detail/BabyFantasyGallery';
import { HolidayGallery } from '@/components/product-detail/HolidayGallery';
import { OverlaysBonusGallery } from '@/components/product-detail/OverlaysBonusGallery';
import { WhatIsIncluded } from '@/components/product-detail/WhatIsIncluded';
import { HowItWorks } from '@/components/product-detail/HowItWorks';
import { ProductFAQ } from '@/components/product-detail/ProductFAQ';
import { CreatorSection } from '@/components/product-detail/CreatorSection';
import { RelatedProducts } from '@/components/product-detail/RelatedProducts';

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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
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
      {/* Breadcrumb */}
      <div className="bg-charcoal pt-24 pb-0">
        <div className="container-wide">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <ProductHero
        product={product}
        selectedVariant={selectedVariant}
        onVariantChange={setSelectedVariant}
        onAddToCart={handleAddToCart}
      />

      {/* Themed Gallery Sections */}
      <MaternityGallery />
      <NewbornGallery />
      <GraduationGallery />
      <BabyFantasyGallery />
      <HolidayGallery />
      <OverlaysBonusGallery />

      {/* What's Included */}
      <WhatIsIncluded productTitle={product.title} />

      {/* How It Works */}
      <HowItWorks />

      {/* FAQ */}
      <ProductFAQ />

      {/* Creator Section */}
      <CreatorSection />

      {/* Related Products */}
      <RelatedProducts currentProductHandle={product.handle} />
    </Layout>
  );
}

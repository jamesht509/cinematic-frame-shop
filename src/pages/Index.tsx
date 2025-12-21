import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useCartStore } from '@/stores/cartStore';
import { fetchProductByHandle } from '@/lib/shopify';
import { toast } from 'sonner';

// Product sections
import { ProductHeroSlider } from '@/components/product-detail/ProductHeroSlider';
import { FreeBonuses } from '@/components/product-detail/FreeBonuses';
import { BeforeAfterShowcase } from '@/components/product-detail/BeforeAfterShowcase';
import { PhotoshopActionFeature } from '@/components/product-detail/PhotoshopActionFeature';
import { MaternityGallery } from '@/components/product-detail/MaternityGallery';
import { NewbornGallery } from '@/components/product-detail/NewbornGallery';
import { GraduationGallery } from '@/components/product-detail/GraduationGallery';
import { BabyFantasyGallery } from '@/components/product-detail/BabyFantasyGallery';
import { HolidayGallery } from '@/components/product-detail/HolidayGallery';
import { OverlaysBonusGallery } from '@/components/product-detail/OverlaysBonusGallery';
import { VideoTutorials } from '@/components/product-detail/VideoTutorials';
import { WhatIsIncluded } from '@/components/product-detail/WhatIsIncluded';
import { HowItWorks } from '@/components/product-detail/HowItWorks';
import { ProductFAQ } from '@/components/product-detail/ProductFAQ';
import { CreatorSection } from '@/components/product-detail/CreatorSection';

// The main product handle - hardcoded for single-product store
const MAIN_PRODUCT_HANDLE = 'fine-art-backdrops-mega-pack';

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

const Index = () => {
  const [product, setProduct] = useState<ProductNode | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await fetchProductByHandle(MAIN_PRODUCT_HANDLE);
        setProduct(data);
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    
    const variant = product.variants.edges[0]?.node;
    if (!variant) return;

    addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
    
    toast.success('Added to cart!', {
      description: product.title,
      position: 'top-center',
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-charcoal-dark">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      </Layout>
    );
  }

  const price = product?.priceRange.minVariantPrice.amount || '97';
  const currency = product?.priceRange.minVariantPrice.currencyCode || 'USD';

  return (
    <Layout>
      {/* 1. Fullscreen Hero Slider */}
      <ProductHeroSlider
        productTitle={product?.title || 'Fine Art Backdrops Mega Pack'}
        productPrice={price}
        currencyCode={currency}
        onAddToCart={handleAddToCart}
      />

      {/* 2. Free Bonuses */}
      <FreeBonuses />

      {/* 3. Exclusive Photoshop Action Feature */}
      <PhotoshopActionFeature />

      {/* 4. Before & After Showcase */}
      <BeforeAfterShowcase />

      {/* 5. Themed Gallery Sections */}
      <MaternityGallery />
      <NewbornGallery />
      <GraduationGallery />
      <BabyFantasyGallery />
      <HolidayGallery />
      <OverlaysBonusGallery />

      {/* 6. Video Tutorials */}
      <VideoTutorials />

      {/* 7. What's Included */}
      <WhatIsIncluded productTitle={product?.title || 'Fine Art Backdrops Mega Pack'} />

      {/* 8. How It Works */}
      <HowItWorks />

      {/* 9. FAQ */}
      <ProductFAQ />

      {/* 10. Creator Section */}
      <CreatorSection />
    </Layout>
  );
};

export default Index;

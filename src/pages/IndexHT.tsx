import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { LayoutHT } from '@/components/ht/LayoutHT';
import { useCartStore } from '@/stores/cartStore';
import { fetchProductByHandle } from '@/lib/shopify';
import { toast } from 'sonner';
import { ht } from '@/locales/ht/translations';

// Product sections - Kreyòl versions
import { ProductHeroSliderHT } from '@/components/ht/ProductHeroSliderHT';
import { FreeBonusesHT } from '@/components/ht/FreeBonusesHT';
import { ProductFAQHT } from '@/components/ht/ProductFAQHT';
import { WhatIsIncludedHT } from '@/components/ht/WhatIsIncludedHT';
import { VideoTutorialsHT } from '@/components/ht/VideoTutorialsHT';

// Reuse non-text-heavy components from original
import { BeforeAfterShowcase } from '@/components/product-detail/BeforeAfterShowcase';
import { PhotoshopActionFeature } from '@/components/product-detail/PhotoshopActionFeature';
import { MaternityGallery } from '@/components/product-detail/MaternityGallery';
import { NewbornGallery } from '@/components/product-detail/NewbornGallery';
import { GraduationGallery } from '@/components/product-detail/GraduationGallery';
import { BabyFantasyGallery } from '@/components/product-detail/BabyFantasyGallery';
import { HolidayGallery } from '@/components/product-detail/HolidayGallery';
import { OverlaysBonusGallery } from '@/components/product-detail/OverlaysBonusGallery';
import { HowItWorks } from '@/components/product-detail/HowItWorks';
import { CreatorSection } from '@/components/product-detail/CreatorSection';

// Conversion components - Kreyòl versions
import { FloatingBuyButtonHT } from '@/components/ht/FloatingBuyButtonHT';
import { UrgencyBarHT } from '@/components/ht/UrgencyBarHT';
import { SectionCTAHT } from '@/components/ht/SectionCTAHT';
import { FinalCTAHT } from '@/components/ht/FinalCTAHT';

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

const IndexHT = () => {
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
    
    toast.success(ht.toast.addedToCart, {
      description: product.title,
      position: 'top-center',
    });
  };

  if (loading) {
    return (
      <LayoutHT>
        <div className="min-h-screen flex items-center justify-center bg-charcoal-dark">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      </LayoutHT>
    );
  }

  const price = product?.priceRange.minVariantPrice.amount || '97';
  const currency = product?.priceRange.minVariantPrice.currencyCode || 'USD';

  return (
    <LayoutHT>
      {/* Urgency Bar at Top */}
      <UrgencyBarHT />

      {/* 1. Fullscreen Hero Slider */}
      <ProductHeroSliderHT
        productTitle={product?.title || 'Fine Art Backdrops Mega Pack'}
        productPrice={price}
        currencyCode={currency}
        onAddToCart={handleAddToCart}
      />

      {/* 2. Free Bonuses */}
      <FreeBonusesHT />

      {/* 3. Exclusive Photoshop Action Feature */}
      <PhotoshopActionFeature />

      {/* CTA after Photoshop Action */}
      <SectionCTAHT 
        variant="highlight"
        heading={ht.cta.photoshopAction.heading}
        subheading={ht.cta.photoshopAction.subheading}
        price={parseFloat(price).toFixed(0)}
        onAddToCart={handleAddToCart}
      />

      {/* 4. Before & After Showcase */}
      <BeforeAfterShowcase />

      {/* CTA after Before/After */}
      <SectionCTAHT 
        variant="default"
        heading={ht.cta.beforeAfter.heading}
        subheading={ht.cta.beforeAfter.subheading}
        price={parseFloat(price).toFixed(0)}
        onAddToCart={handleAddToCart}
      />

      {/* 5. Themed Gallery Sections */}
      <MaternityGallery />
      <NewbornGallery />
      
      {/* Mini CTA */}
      <SectionCTAHT variant="minimal" price={parseFloat(price).toFixed(0)} onAddToCart={handleAddToCart} />

      <GraduationGallery />
      <BabyFantasyGallery />
      <HolidayGallery />
      <OverlaysBonusGallery />

      {/* CTA after galleries */}
      <SectionCTAHT 
        variant="highlight"
        heading={ht.cta.galleries.heading}
        subheading={ht.cta.galleries.subheading}
        price={parseFloat(price).toFixed(0)}
        onAddToCart={handleAddToCart}
      />

      {/* 6. Video Tutorials */}
      <VideoTutorialsHT />

      {/* 7. What's Included */}
      <WhatIsIncludedHT productTitle={product?.title || 'Fine Art Backdrops Mega Pack'} />

      {/* 8. How It Works */}
      <HowItWorks />

      {/* 9. FAQ */}
      <ProductFAQHT />

      {/* 10. Creator Section */}
      <CreatorSection />

      {/* 11. Final CTA - Last Chance */}
      <FinalCTAHT 
        price={price}
        currencyCode={currency}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Buy Button */}
      <FloatingBuyButtonHT 
        price={price}
        currencyCode={currency}
        onAddToCart={handleAddToCart}
      />
    </LayoutHT>
  );
};

export default IndexHT;

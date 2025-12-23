import { useEffect } from 'react';
import { LayoutHT } from '@/components/ht/LayoutHT';
import { createCheckoutSession } from '@/lib/stripe';
import { toast } from 'sonner';
import { ht } from '@/locales/ht/translations';
import { trackAddToCart, trackViewContent } from '@/lib/metaPixel';
import { SEOHead } from '@/components/SEOHead';

// Product sections - Kreyòl versions
import { ProductHeroSliderHT } from '@/components/ht/ProductHeroSliderHT';
import { FreeBonusesHT } from '@/components/ht/FreeBonusesHT';
import { ProductFAQHT } from '@/components/ht/ProductFAQHT';
import { WhatIsIncludedHT } from '@/components/ht/WhatIsIncludedHT';
import { VideoTutorialsHT } from '@/components/ht/VideoTutorialsHT';

// Reuse non-text-heavy components from original
import { BeforeAfterShowcaseHT } from '@/components/ht/BeforeAfterShowcaseHT';
import { PhotoshopActionFeatureHT } from '@/components/ht/PhotoshopActionFeatureHT';
import { MaternityGallery } from '@/components/product-detail/MaternityGallery';
import { NewbornGallery } from '@/components/product-detail/NewbornGallery';
import { GraduationGallery } from '@/components/product-detail/GraduationGallery';
import { BabyFantasyGallery } from '@/components/product-detail/BabyFantasyGallery';
import { HolidayGallery } from '@/components/product-detail/HolidayGallery';
import { OverlaysBonusGallery } from '@/components/product-detail/OverlaysBonusGallery';
import { HowItWorksHT } from '@/components/ht/HowItWorksHT';
import { CreatorSection } from '@/components/product-detail/CreatorSection';

// Conversion components - Kreyòl versions
import { FloatingBuyButtonHT } from '@/components/ht/FloatingBuyButtonHT';
import { UrgencyBarHT } from '@/components/ht/UrgencyBarHT';
import { SectionCTAHT } from '@/components/ht/SectionCTAHT';
import { FinalCTAHT } from '@/components/ht/FinalCTAHT';

// Product configuration - Stripe
const PRODUCT_CONFIG = {
  id: '2adad4d4-257a-4316-98ed-b0cb5fdcd46a',
  title: 'Fine Art Backdrops Mega Pack',
  price: '79',
  currency: 'USD',
  priceId: 'price_1ShOExDpQeuTAAl5kSbVJYE9',
};

const IndexHT = () => {
  // Track view on mount
  useEffect(() => {
    trackViewContent(
      PRODUCT_CONFIG.title,
      'Photography Backdrops',
      parseFloat(PRODUCT_CONFIG.price)
    );
  }, []);

  const handleBuyNow = async () => {
    try {
      // Track AddToCart event
      trackAddToCart(
        [PRODUCT_CONFIG.id],
        parseFloat(PRODUCT_CONFIG.price),
        1
      );

      toast.loading('Redireksyon nan checkout...', { id: 'checkout' });

      const checkoutUrl = await createCheckoutSession({
        priceId: PRODUCT_CONFIG.priceId,
        productId: PRODUCT_CONFIG.id,
      });

      // Open checkout in new tab
      window.open(checkoutUrl, '_blank');
      
      toast.success('Checkout louvri!', { 
        id: 'checkout',
        position: 'top-center',
      });
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Erè pandan kreyasyon checkout. Eseye ankò.', { id: 'checkout' });
    }
  };

  return (
    <LayoutHT>
      <SEOHead 
        title="Fon Dijital & Aksyon Photoshop pou Fotograf"
        description="Fon dijital pwofesyonèl ak aksyon Photoshop pou fotograf. Transfòme foto ou ak fon magnifik."
        lang="ht"
      />
      {/* Urgency Bar at Top */}
      <UrgencyBarHT />

      {/* 1. Fullscreen Hero Slider */}
      <ProductHeroSliderHT
        productTitle={PRODUCT_CONFIG.title}
        productPrice={PRODUCT_CONFIG.price}
        currencyCode={PRODUCT_CONFIG.currency}
        onAddToCart={handleBuyNow}
      />

      {/* 2. Free Bonuses */}
      <FreeBonusesHT />

      {/* 3. Exclusive Photoshop Action Feature */}
      <PhotoshopActionFeatureHT />

      {/* CTA after Photoshop Action */}
      <SectionCTAHT 
        variant="highlight"
        heading={ht.cta.photoshopAction.heading}
        subheading={ht.cta.photoshopAction.subheading}
        price={PRODUCT_CONFIG.price}
        onAddToCart={handleBuyNow}
      />

      {/* 4. Before & After Showcase */}
      <BeforeAfterShowcaseHT />

      {/* CTA after Before/After */}
      <SectionCTAHT 
        variant="default"
        heading={ht.cta.beforeAfter.heading}
        subheading={ht.cta.beforeAfter.subheading}
        price={PRODUCT_CONFIG.price}
        onAddToCart={handleBuyNow}
      />

      {/* 5. Themed Gallery Sections */}
      <MaternityGallery />
      <NewbornGallery />
      
      {/* Mini CTA */}
      <SectionCTAHT variant="minimal" price={PRODUCT_CONFIG.price} onAddToCart={handleBuyNow} />

      <GraduationGallery />
      <BabyFantasyGallery />
      <HolidayGallery />
      <OverlaysBonusGallery />

      {/* CTA after galleries */}
      <SectionCTAHT 
        variant="highlight"
        heading={ht.cta.galleries.heading}
        subheading={ht.cta.galleries.subheading}
        price={PRODUCT_CONFIG.price}
        onAddToCart={handleBuyNow}
      />

      {/* 6. Video Tutorials */}
      <VideoTutorialsHT />

      {/* 7. What's Included */}
      <WhatIsIncludedHT productTitle={PRODUCT_CONFIG.title} />

      {/* 8. How It Works */}
      <HowItWorksHT />

      {/* 9. FAQ */}
      <ProductFAQHT />

      {/* 10. Creator Section */}
      <CreatorSection />

      {/* 11. Final CTA - Last Chance */}
      <FinalCTAHT 
        price={PRODUCT_CONFIG.price}
        currencyCode={PRODUCT_CONFIG.currency}
        onAddToCart={handleBuyNow}
      />

      {/* Floating Buy Button */}
      <FloatingBuyButtonHT 
        price={PRODUCT_CONFIG.price}
        currencyCode={PRODUCT_CONFIG.currency}
        onAddToCart={handleBuyNow}
      />
    </LayoutHT>
  );
};

export default IndexHT;
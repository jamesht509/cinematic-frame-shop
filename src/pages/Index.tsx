import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { toast } from 'sonner';
import { trackAddToCart, trackViewContent } from '@/lib/metaPixel';
import { SEOHead } from '@/components/SEOHead';
import { EmbeddedCheckoutModal } from '@/components/checkout/EmbeddedCheckoutModal';

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

// Conversion components
import { FloatingBuyButton } from '@/components/conversion/FloatingBuyButton';
import { UrgencyBar } from '@/components/conversion/UrgencyBar';
import { SectionCTA } from '@/components/conversion/SectionCTA';
import { FinalCTA } from '@/components/conversion/FinalCTA';

// Product configuration - Stripe
const PRODUCT_CONFIG = {
  id: '2adad4d4-257a-4316-98ed-b0cb5fdcd46a',
  title: 'Fine Art Backdrops Mega Pack',
  price: '79',
  currency: 'USD',
  priceId: 'price_1ShOExDpQeuTAAl5kSbVJYE9',
};

const Index = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Track view on mount
  useEffect(() => {
    trackViewContent(
      PRODUCT_CONFIG.title,
      'Photography Backdrops',
      parseFloat(PRODUCT_CONFIG.price)
    );
  }, []);

  const handleBuyNow = () => {
    // Track AddToCart event
    trackAddToCart(
      [PRODUCT_CONFIG.id],
      parseFloat(PRODUCT_CONFIG.price),
      1
    );

    // Open embedded checkout modal
    setIsCheckoutOpen(true);
  };

  return (
    <Layout>
      <SEOHead 
        title="Digital Backgrounds & Photoshop Actions for Photographers"
        description="Professional digital backgrounds & Photoshop actions for photographers. Transform your photos with stunning backdrops."
        lang="en"
      />

      {/* Embedded Checkout Modal */}
      <EmbeddedCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        priceId={PRODUCT_CONFIG.priceId}
        productId={PRODUCT_CONFIG.id}
      />

      {/* Urgency Bar at Top */}
      <UrgencyBar />

      {/* 1. Fullscreen Hero Slider */}
      <ProductHeroSlider
        productTitle={PRODUCT_CONFIG.title}
        productPrice={PRODUCT_CONFIG.price}
        currencyCode={PRODUCT_CONFIG.currency}
        onAddToCart={handleBuyNow}
      />

      {/* 2. Free Bonuses */}
      <FreeBonuses />

      {/* 3. Exclusive Photoshop Action Feature */}
      <PhotoshopActionFeature />

      {/* CTA after Photoshop Action */}
      <SectionCTA 
        variant="highlight"
        heading="Get the Photoshop Action FREE!"
        subheading="Included with your purchase - a $97 value"
        price={PRODUCT_CONFIG.price}
        onAddToCart={handleBuyNow}
      />

      {/* 4. Before & After Showcase */}
      <BeforeAfterShowcase />

      {/* CTA after Before/After */}
      <SectionCTA 
        variant="default"
        heading="See the Magic? Get Yours Now!"
        subheading="Join 2000+ photographers creating stunning images"
        price={PRODUCT_CONFIG.price}
        onAddToCart={handleBuyNow}
      />

      {/* 5. Themed Gallery Sections */}
      <MaternityGallery />
      <NewbornGallery />
      
      {/* Mini CTA */}
      <SectionCTA variant="minimal" price={PRODUCT_CONFIG.price} onAddToCart={handleBuyNow} />

      <GraduationGallery />
      <BabyFantasyGallery />
      <HolidayGallery />
      <OverlaysBonusGallery />

      {/* CTA after galleries */}
      <SectionCTA 
        variant="highlight"
        heading="All These Categories Included!"
        subheading="2000+ backdrops across maternity, newborn, graduation, holidays & more"
        price={PRODUCT_CONFIG.price}
        onAddToCart={handleBuyNow}
      />

      {/* 6. Video Tutorials */}
      <VideoTutorials />

      {/* 7. What's Included */}
      <WhatIsIncluded productTitle={PRODUCT_CONFIG.title} />

      {/* 8. How It Works */}
      <HowItWorks />

      {/* 9. FAQ */}
      <ProductFAQ />

      {/* 10. Creator Section */}
      <CreatorSection />

      {/* 11. Final CTA - Last Chance */}
      <FinalCTA 
        price={PRODUCT_CONFIG.price}
        currencyCode={PRODUCT_CONFIG.currency}
        onAddToCart={handleBuyNow}
      />

      {/* Floating Buy Button */}
      <FloatingBuyButton 
        price={PRODUCT_CONFIG.price}
        currencyCode={PRODUCT_CONFIG.currency}
        onAddToCart={handleBuyNow}
      />
    </Layout>
  );
};

export default Index;
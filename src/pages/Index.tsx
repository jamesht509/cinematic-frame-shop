import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { createCheckoutSession } from '@/lib/stripe';
import { toast } from 'sonner';
import { trackAddToCart, trackViewContent } from '@/lib/metaPixel';
import { SEOHead } from '@/components/SEOHead';

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
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutName, setCheckoutName] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Track view on mount
  useState(() => {
    trackViewContent(
      PRODUCT_CONFIG.title,
      'Photography Backdrops',
      parseFloat(PRODUCT_CONFIG.price)
    );
  });

  const handleBuyNow = () => {
    setShowEmailModal(true);
  };

  const handleCheckout = async () => {
    if (!checkoutEmail) {
      toast.error('Por favor, insira seu email');
      return;
    }

    setIsCheckoutLoading(true);
    
    try {
      // Track AddToCart event
      trackAddToCart(
        [PRODUCT_CONFIG.id],
        parseFloat(PRODUCT_CONFIG.price),
        1
      );

      const checkoutUrl = await createCheckoutSession({
        priceId: PRODUCT_CONFIG.priceId,
        productId: PRODUCT_CONFIG.id,
        customerEmail: checkoutEmail,
        customerName: checkoutName,
      });

      // Open checkout in new tab
      window.open(checkoutUrl, '_blank');
      setShowEmailModal(false);
      
      toast.success('Redirecionando para o checkout...', {
        position: 'top-center',
      });
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Erro ao criar checkout. Tente novamente.');
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <Layout>
      <SEOHead 
        title="Digital Backgrounds & Photoshop Actions for Photographers"
        description="Professional digital backgrounds & Photoshop actions for photographers. Transform your photos with stunning backdrops."
        lang="en"
      />
      
      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-background rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Complete Your Purchase</h3>
            <p className="text-muted-foreground mb-6">
              Enter your email to receive your download link
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={checkoutName}
                  onChange={(e) => setCheckoutName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={checkoutEmail}
                  onChange={(e) => setCheckoutEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isCheckoutLoading}
                className="w-full bg-gold hover:bg-gold-light text-charcoal-dark font-bold py-4 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isCheckoutLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout - ${PRODUCT_CONFIG.price}
                  </>
                )}
              </button>
              
              <button
                onClick={() => setShowEmailModal(false)}
                className="w-full text-muted-foreground hover:text-foreground py-2 transition-colors"
              >
                Cancel
              </button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4 text-center">
              🔒 Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      )}

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

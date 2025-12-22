import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useCartStore } from '@/stores/cartStore';
import { fetchProductByHandle } from '@/lib/shopify';
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
        
        // Track ViewContent when product loads
        if (data) {
          trackViewContent(
            data.title,
            'Photography Backdrops',
            parseFloat(data.priceRange.minVariantPrice.amount)
          );
        }
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
    
    // Track AddToCart event
    trackAddToCart(
      [product.id],
      parseFloat(variant.price.amount),
      1
    );
    
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
      <SEOHead 
        title="Digital Backgrounds & Photoshop Actions for Photographers"
        description="Professional digital backgrounds & Photoshop actions for photographers. Transform your photos with stunning backdrops."
        lang="en"
      />
      {/* Urgency Bar at Top */}
      <UrgencyBar />

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

      {/* CTA after Photoshop Action */}
      <SectionCTA 
        variant="highlight"
        heading="Get the Photoshop Action FREE!"
        subheading="Included with your purchase - a $97 value"
        price={parseFloat(price).toFixed(0)}
        onAddToCart={handleAddToCart}
      />

      {/* 4. Before & After Showcase */}
      <BeforeAfterShowcase />

      {/* CTA after Before/After */}
      <SectionCTA 
        variant="default"
        heading="See the Magic? Get Yours Now!"
        subheading="Join 2000+ photographers creating stunning images"
        price={parseFloat(price).toFixed(0)}
        onAddToCart={handleAddToCart}
      />

      {/* 5. Themed Gallery Sections */}
      <MaternityGallery />
      <NewbornGallery />
      
      {/* Mini CTA */}
      <SectionCTA variant="minimal" price={parseFloat(price).toFixed(0)} onAddToCart={handleAddToCart} />

      <GraduationGallery />
      <BabyFantasyGallery />
      <HolidayGallery />
      <OverlaysBonusGallery />

      {/* CTA after galleries */}
      <SectionCTA 
        variant="highlight"
        heading="All These Categories Included!"
        subheading="2000+ backdrops across maternity, newborn, graduation, holidays & more"
        price={parseFloat(price).toFixed(0)}
        onAddToCart={handleAddToCart}
      />

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

      {/* 11. Final CTA - Last Chance */}
      <FinalCTA 
        price={price}
        currencyCode={currency}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Buy Button */}
      <FloatingBuyButton 
        price={price}
        currencyCode={currency}
        onAddToCart={handleAddToCart}
      />
    </Layout>
  );
};

export default Index;

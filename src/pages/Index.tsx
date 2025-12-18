import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { TopPicks } from '@/components/home/TopPicks';
import { MasonryGallery } from '@/components/home/MasonryGallery';
import { SplitBanner } from '@/components/home/SplitBanner';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FounderSection } from '@/components/home/FounderSection';

const Index = () => {
  return (
    <Layout>
      {/* 1. Hero - Magazine Cover with Image Background */}
      <Hero />
      
      {/* 2. Trust Strip - Dark Grey with Icons */}
      <TrustStrip />
      
      {/* 3. Product Grid - White Background */}
      <TopPicks />
      
      {/* 4. Masonry Gallery - Warm Beige Background */}
      <MasonryGallery />
      
      {/* 5. Split Banner - 50/50 Layout */}
      <SplitBanner />
      
      {/* 6. Category Navigator - Dark Charcoal 3x3 Grid */}
      <CategoryGrid />
      
      {/* 7. Founder Section - Black with Circular Portrait */}
      <FounderSection />
    </Layout>
  );
};

export default Index;
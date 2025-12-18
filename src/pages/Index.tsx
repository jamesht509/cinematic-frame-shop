import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { TopPicks } from '@/components/home/TopPicks';
import { TrustBar } from '@/components/home/TrustBar';
import { CustomerGallery } from '@/components/home/CustomerGallery';
import { EditingScenes } from '@/components/home/EditingScenes';
import { CategoryIcons } from '@/components/home/CategoryIcons';
import { BundleDeals } from '@/components/home/BundleDeals';
import { IndustryMasters } from '@/components/home/IndustryMasters';
import { FounderSection } from '@/components/home/FounderSection';
import { ShopifyProductGrid } from '@/components/products/ShopifyProductGrid';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <TrustBar />
      <TopPicks />
      <CustomerGallery />
      <EditingScenes />
      <CategoryIcons />
      <BundleDeals />
      <ShopifyProductGrid 
        title="Shop All Products"
        subtitle="Browse our complete collection of professional presets and actions."
      />
      <IndustryMasters />
      <FounderSection />
    </Layout>
  );
};

export default Index;

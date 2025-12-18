import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { NicheGrid } from '@/components/home/NicheGrid';
import { TransformationShowcase } from '@/components/home/TransformationShowcase';
import { ProductGrid } from '@/components/products/ProductGrid';
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel';
import { FounderSection } from '@/components/home/FounderSection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <NicheGrid />
      <TransformationShowcase />
      <ProductGrid 
        title="Featured Products"
        subtitle="Our most popular presets, loved by photographers worldwide."
      />
      <TestimonialCarousel />
      <FounderSection />
    </Layout>
  );
};

export default Index;

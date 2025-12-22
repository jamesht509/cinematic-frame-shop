import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initMetaPixel, trackPageView } from '@/lib/metaPixel';

export function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    initMetaPixel();
  }, []);

  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  return <>{children}</>;
}

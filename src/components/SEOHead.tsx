import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  lang?: string;
}

export function SEOHead({ title, description, lang = 'en' }: SEOHeadProps) {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    // Update og:description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
  }, [title, description, lang]);

  return null;
}

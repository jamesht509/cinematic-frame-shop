import { supabase } from "@/integrations/supabase/client";

const META_PIXEL_ID = "1167088868872389";

// Generate unique event ID
const generateEventId = () => {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

// Get Facebook cookies
const getFbCookies = () => {
  if (typeof document === 'undefined') return { fbc: null, fbp: null };
  
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    if (key) acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return {
    fbc: cookies._fbc || null,
    fbp: cookies._fbp || null,
  };
};

// Initialize Meta Pixel (client-side)
export const initMetaPixel = () => {
  if (typeof window === 'undefined') return;

  // Check if already initialized
  if ((window as any).fbq) return;

  // Facebook Pixel base code
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  (window as any).fbq('init', META_PIXEL_ID);
  (window as any).fbq('track', 'PageView');
  
  console.log('Meta Pixel initialized with ID:', META_PIXEL_ID);
};

// Track event (both client and server-side)
export const trackEvent = async (
  eventName: string,
  customData?: {
    currency?: string;
    value?: number;
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;
    num_items?: number;
    order_id?: string;
  }
) => {
  if (typeof window === 'undefined') return;
  
  const eventId = generateEventId();
  const { fbc, fbp } = getFbCookies();

  // Client-side tracking
  if ((window as any).fbq) {
    (window as any).fbq('track', eventName, customData, { eventID: eventId });
    console.log(`[Meta Pixel] Client-side ${eventName} event sent`);
  }

  // Server-side tracking via Edge Function (for better match rate)
  try {
    const { data, error } = await supabase.functions.invoke('meta-conversions', {
      body: {
        events: [{
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: window.location.href.split('?')[0], // Remove query params
          action_source: 'website',
          user_data: {
            client_user_agent: navigator.userAgent,
            fbc,
            fbp,
          },
          custom_data: customData,
        }],
      },
    });

    if (error) {
      console.error('[Meta CAPI] Server-side tracking error:', error);
    } else {
      console.log(`[Meta CAPI] Server-side ${eventName} event sent successfully`);
    }
  } catch (err) {
    console.error('[Meta CAPI] Failed to send server-side event:', err);
  }
};

// Standard events
export const trackPageView = () => trackEvent('PageView');

export const trackViewContent = (contentName: string, contentCategory?: string, value?: number) => 
  trackEvent('ViewContent', { 
    content_name: contentName, 
    content_category: contentCategory, 
    value, 
    currency: 'USD' 
  });

export const trackAddToCart = (contentIds: string[], value: number, numItems: number = 1) => 
  trackEvent('AddToCart', { 
    content_ids: contentIds, 
    value, 
    currency: 'USD', 
    num_items: numItems, 
    content_type: 'product' 
  });

export const trackInitiateCheckout = (value: number, numItems: number, contentIds?: string[]) => 
  trackEvent('InitiateCheckout', { 
    value, 
    currency: 'USD', 
    num_items: numItems,
    content_ids: contentIds,
    content_type: 'product'
  });

export const trackPurchase = (contentIds: string[], value: number, numItems: number, orderId?: string) => 
  trackEvent('Purchase', { 
    content_ids: contentIds, 
    value, 
    currency: 'USD', 
    num_items: numItems, 
    content_type: 'product',
    order_id: orderId
  });

export const trackLead = () => trackEvent('Lead');
export const trackContact = () => trackEvent('Contact');

// Check if pixel is properly loaded
export const isPixelLoaded = (): boolean => {
  return typeof window !== 'undefined' && !!(window as any).fbq;
};

// Debug function to verify pixel installation
export const debugPixelInstallation = () => {
  if (typeof window === 'undefined') {
    console.log('[Meta Pixel Debug] Not in browser environment');
    return;
  }
  
  const fbq = (window as any).fbq;
  const cookies = getFbCookies();
  
  console.log('[Meta Pixel Debug] ==================');
  console.log('[Meta Pixel Debug] Pixel ID:', META_PIXEL_ID);
  console.log('[Meta Pixel Debug] fbq loaded:', !!fbq);
  console.log('[Meta Pixel Debug] fbq version:', fbq?.version);
  console.log('[Meta Pixel Debug] _fbc cookie:', cookies.fbc);
  console.log('[Meta Pixel Debug] _fbp cookie:', cookies.fbp);
  console.log('[Meta Pixel Debug] Current URL:', window.location.href);
  console.log('[Meta Pixel Debug] ==================');
  
  return {
    pixelId: META_PIXEL_ID,
    isLoaded: !!fbq,
    version: fbq?.version,
    cookies,
  };
};

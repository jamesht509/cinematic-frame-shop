import { supabase } from "@/integrations/supabase/client";

const META_PIXEL_ID = "1167088868872389";

// Generate unique event ID
const generateEventId = () => {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

// Get Facebook cookies
const getFbCookies = () => {
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
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
  }
) => {
  const eventId = generateEventId();
  const { fbc, fbp } = getFbCookies();

  // Client-side tracking
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, customData, { eventID: eventId });
  }

  // Server-side tracking via Edge Function
  try {
    const { error } = await supabase.functions.invoke('meta-conversions', {
      body: {
        events: [{
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: window.location.href,
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
      console.error('Server-side tracking error:', error);
    }
  } catch (err) {
    console.error('Failed to send server-side event:', err);
  }
};

// Standard events
export const trackPageView = () => trackEvent('PageView');
export const trackViewContent = (contentName: string, contentCategory?: string, value?: number) => 
  trackEvent('ViewContent', { content_name: contentName, content_category: contentCategory, value, currency: 'USD' });
export const trackAddToCart = (contentIds: string[], value: number, numItems: number = 1) => 
  trackEvent('AddToCart', { content_ids: contentIds, value, currency: 'USD', num_items: numItems, content_type: 'product' });
export const trackInitiateCheckout = (value: number, numItems: number) => 
  trackEvent('InitiateCheckout', { value, currency: 'USD', num_items: numItems });
export const trackPurchase = (contentIds: string[], value: number, numItems: number) => 
  trackEvent('Purchase', { content_ids: contentIds, value, currency: 'USD', num_items: numItems, content_type: 'product' });
export const trackLead = () => trackEvent('Lead');
export const trackContact = () => trackEvent('Contact');

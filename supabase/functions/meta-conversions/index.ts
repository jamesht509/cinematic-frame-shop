import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const META_PIXEL_ID = "1167088868872389";
const META_API_VERSION = "v18.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-forwarded-for, x-real-ip',
};

interface MetaEvent {
  event_name: string;
  event_time: number;
  event_id: string;
  event_source_url: string;
  action_source: string;
  user_data: {
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string | null;
    fbp?: string | null;
    em?: string[];
    ph?: string[];
    external_id?: string[];
  };
  custom_data?: {
    currency?: string;
    value?: number;
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;
    num_items?: number;
  };
}

// Get client IP from various headers
const getClientIp = (req: Request): string => {
  // Check various headers for the real client IP
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  // Fallback - this might not be the real IP behind proxies
  return req.headers.get('host')?.split(':')[0] || '0.0.0.0';
};

// Generate a simple hash for external_id (for better matching without PII)
const generateExternalId = (userAgent: string, ip: string): string => {
  const data = `${userAgent}_${ip}_${new Date().toISOString().split('T')[0]}`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get('META_ACCESS_TOKEN');
    
    if (!accessToken) {
      console.error('META_ACCESS_TOKEN not configured');
      return new Response(
        JSON.stringify({ error: 'Meta access token not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { events } = body as { events: MetaEvent[] };

    if (!events || !Array.isArray(events) || events.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No events provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get client IP from request headers
    const clientIp = getClientIp(req);
    console.log('Client IP detected:', clientIp);

    // Enrich events with server-side data
    const enrichedEvents = events.map(event => {
      const userAgent = event.user_data?.client_user_agent || req.headers.get('user-agent') || '';
      const externalId = generateExternalId(userAgent, clientIp);
      
      return {
        ...event,
        event_time: event.event_time || Math.floor(Date.now() / 1000),
        action_source: event.action_source || 'website',
        user_data: {
          ...event.user_data,
          client_ip_address: clientIp,
          client_user_agent: userAgent,
          external_id: [externalId],
          // Remove null values
          fbc: event.user_data?.fbc || undefined,
          fbp: event.user_data?.fbp || undefined,
        },
      };
    });

    const payload = {
      data: enrichedEvents,
      access_token: accessToken,
    };

    console.log(`Sending ${enrichedEvents.length} event(s) to Meta Conversions API`);
    console.log('Event details:', JSON.stringify(enrichedEvents.map(e => ({
      event_name: e.event_name,
      has_ip: !!e.user_data.client_ip_address,
      has_ua: !!e.user_data.client_user_agent,
      has_external_id: !!e.user_data.external_id,
    }))));

    const response = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Meta API error:', result);
      return new Response(
        JSON.stringify({ error: 'Meta API error', details: result }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Meta API success:', result);

    return new Response(
      JSON.stringify({ success: true, result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in meta-conversions function:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

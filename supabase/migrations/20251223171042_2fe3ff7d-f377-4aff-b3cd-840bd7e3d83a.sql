-- Create a protected content table for sensitive product URLs
CREATE TABLE public.product_protected_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  download_url TEXT,
  whatsapp_group_url TEXT,
  video_tutorial_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(product_id)
);

-- Enable RLS on the protected content table
ALTER TABLE public.product_protected_content ENABLE ROW LEVEL SECURITY;

-- Create RLS policy: Only users who purchased can view protected content
CREATE POLICY "Users who purchased can view protected content"
ON public.product_protected_content
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.purchases
    WHERE purchases.product_id = product_protected_content.product_id
      AND purchases.user_id = auth.uid()
      AND purchases.status = 'completed'
  )
);

-- Admins can manage protected content
CREATE POLICY "Admins can manage protected content"
ON public.product_protected_content
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Migrate existing data from products to protected content
INSERT INTO public.product_protected_content (product_id, download_url, whatsapp_group_url, video_tutorial_url)
SELECT id, download_url, whatsapp_group_url, video_tutorial_url
FROM public.products
WHERE download_url IS NOT NULL 
   OR whatsapp_group_url IS NOT NULL 
   OR video_tutorial_url IS NOT NULL;

-- Remove sensitive columns from products table
ALTER TABLE public.products DROP COLUMN IF EXISTS download_url;
ALTER TABLE public.products DROP COLUMN IF EXISTS whatsapp_group_url;
ALTER TABLE public.products DROP COLUMN IF EXISTS video_tutorial_url;
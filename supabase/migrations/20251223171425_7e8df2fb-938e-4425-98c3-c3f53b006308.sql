-- Drop and recreate the purchases RLS policy to properly handle NULL user_id
-- Guest purchases (NULL user_id) should NOT be visible to anyone except admins
DROP POLICY IF EXISTS "Users can view own purchases" ON public.purchases;

-- Users can only view their own purchases (requires non-null user_id)
CREATE POLICY "Users can view own purchases" ON public.purchases
  FOR SELECT USING (
    auth.uid() IS NOT NULL 
    AND user_id IS NOT NULL 
    AND auth.uid() = user_id
  );

-- Add explicit restrictive policies for user_roles to make intentions clear
CREATE POLICY "Only admins can insert roles" ON public.user_roles
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles" ON public.user_roles
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles" ON public.user_roles
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Split products ALL policy into explicit individual policies
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

CREATE POLICY "Admins can insert products" ON public.products
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update products" ON public.products
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete products" ON public.products
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));
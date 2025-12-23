-- Create a restrictive policy that explicitly denies access to purchases with NULL user_id
-- This ensures guest purchases are protected from unauthorized access
CREATE POLICY "No public access to guest purchases" ON public.purchases
  AS RESTRICTIVE
  FOR SELECT
  USING (user_id IS NOT NULL);
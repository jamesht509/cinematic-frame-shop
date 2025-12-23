-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Service role can insert purchases" ON public.purchases;
DROP POLICY IF EXISTS "Service role can update purchases" ON public.purchases;

-- The service role in Supabase automatically bypasses RLS, so we don't need 
-- explicit policies for it. Edge functions using the service role key will 
-- work without any policies. Regular authenticated users should only be able 
-- to view their own purchases (which is already covered by "Users can view own purchases").

-- No replacement policies needed - the service role bypasses RLS by design,
-- and removing these policies actually IMPROVES security by preventing 
-- regular authenticated users from inserting/updating any purchases.
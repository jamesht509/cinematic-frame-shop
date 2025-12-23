-- Add policy to protect purchases without user_id (guest/incomplete purchases)
-- Service role can still insert/manage, but no public access to NULL user_id records
CREATE POLICY "Service role can manage all purchases"
ON public.purchases
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
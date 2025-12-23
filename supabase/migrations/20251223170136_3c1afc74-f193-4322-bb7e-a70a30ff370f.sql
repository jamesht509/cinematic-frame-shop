-- Improve has_role function with NULL validation
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT CASE 
    WHEN _user_id IS NULL THEN FALSE
    ELSE EXISTS (
      SELECT 1
      FROM public.user_roles
      WHERE user_id = _user_id
        AND role = _role
    )
  END;
$$;

-- Update RLS policy for purchases to be more explicit
DROP POLICY IF EXISTS "Users can view own purchases" ON public.purchases;
CREATE POLICY "Users can view own purchases" ON public.purchases
  FOR SELECT USING (
    auth.uid() = user_id 
    AND user_id IS NOT NULL
  );

-- Add explicit restrictive DELETE policy to prevent any deletions on profiles
CREATE POLICY "No one can delete profiles" ON public.profiles
  FOR DELETE USING (false);
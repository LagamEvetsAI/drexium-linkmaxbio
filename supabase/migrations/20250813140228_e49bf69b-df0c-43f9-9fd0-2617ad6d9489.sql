
-- Priority 1: Fix Critical Data Exposure in link_clicks table
-- Remove the overly permissive SELECT policy and replace with proper user-specific access
DROP POLICY IF EXISTS "Users can view their own link clicks" ON public.link_clicks;

-- Create more restrictive policy for link clicks - users can only see clicks on their own links
CREATE POLICY "Users can view clicks on their own links" 
ON public.link_clicks 
FOR SELECT 
USING (
  user_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.links 
    WHERE links.id = link_clicks.link_id 
    AND links.user_id = auth.uid()
  )
);

-- Priority 2: Fix database function security issues
-- Update handle_new_user function with proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $function$
DECLARE
  base_username TEXT;
  final_username TEXT;
  counter INTEGER := 0;
BEGIN
  -- Generate base username from name or email
  base_username := LOWER(REGEXP_REPLACE(
    COALESCE(NEW.raw_user_meta_data->>'name', SPLIT_PART(NEW.email, '@', 1)), 
    '[^a-zA-Z0-9]', '', 'g'
  ));
  
  -- Ensure base username is not empty
  IF base_username = '' THEN
    base_username := 'user';
  END IF;
  
  -- Find unique username
  final_username := base_username;
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username) LOOP
    counter := counter + 1;
    final_username := base_username || counter::text;
  END LOOP;
  
  INSERT INTO public.profiles (id, name, username, slug)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Usuário'),
    final_username,
    final_username || '-' || SUBSTRING(NEW.id::text, 1, 8)
  );
  RETURN NEW;
END;
$function$;

-- Update generate_unique_slug function with proper search_path
CREATE OR REPLACE FUNCTION public.generate_unique_slug(base_slug text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  new_slug TEXT;
  counter INTEGER := 0;
BEGIN
  new_slug := base_slug;
  
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE slug = new_slug) LOOP
    counter := counter + 1;
    new_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN new_slug;
END;
$function$;

-- Priority 3: Create secure social_links table to replace localStorage storage
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, platform)
);

-- Enable RLS on social_links table
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for social_links
CREATE POLICY "Users can view their own social links" 
ON public.social_links 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own social links" 
ON public.social_links 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own social links" 
ON public.social_links 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own social links" 
ON public.social_links 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_social_links_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE TRIGGER update_social_links_updated_at
  BEFORE UPDATE ON public.social_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_social_links_updated_at();

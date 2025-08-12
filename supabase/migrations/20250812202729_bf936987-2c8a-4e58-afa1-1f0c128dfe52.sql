
-- Create table to track link clicks
CREATE TABLE public.link_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  link_id UUID NOT NULL REFERENCES public.links(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address INET,
  user_agent TEXT,
  referer TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  click_source TEXT DEFAULT 'bio_page'
);

-- Enable RLS on the table
ALTER TABLE public.link_clicks ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own link clicks
CREATE POLICY "Users can view their own link clicks" 
  ON public.link_clicks 
  FOR SELECT 
  USING (user_id = auth.uid());

-- Create policy to allow public insertion of clicks (for tracking anonymous clicks)
CREATE POLICY "Anyone can insert link clicks" 
  ON public.link_clicks 
  FOR INSERT 
  WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_link_clicks_link_id ON public.link_clicks(link_id);
CREATE INDEX idx_link_clicks_user_id ON public.link_clicks(user_id);
CREATE INDEX idx_link_clicks_clicked_at ON public.link_clicks(clicked_at);

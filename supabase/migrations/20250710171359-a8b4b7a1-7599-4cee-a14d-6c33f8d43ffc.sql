
-- Adicionar tabela para armazenar links dos usuários
CREATE TABLE IF NOT EXISTS public.links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar colunas que podem estar faltando na tabela profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'default',
ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '[]'::jsonb;

-- Habilitar RLS na tabela links
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- Políticas para a tabela links
CREATE POLICY IF NOT EXISTS "Users can view their own links" 
  ON public.links 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can create their own links" 
  ON public.links 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own links" 
  ON public.links 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own links" 
  ON public.links 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Política para visualização pública dos links (para páginas públicas)
CREATE POLICY IF NOT EXISTS "Public links are viewable by everyone" 
  ON public.links 
  FOR SELECT 
  USING (active = true);

-- Criar bucket para avatars se não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Política para upload de avatars
CREATE POLICY IF NOT EXISTS "Users can upload their own avatar" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Política para visualização pública de avatars
CREATE POLICY IF NOT EXISTS "Avatar images are publicly accessible" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'avatars');

-- Política para atualização de avatars
CREATE POLICY IF NOT EXISTS "Users can update their own avatar" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Política para deletar avatars
CREATE POLICY IF NOT EXISTS "Users can delete their own avatar" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

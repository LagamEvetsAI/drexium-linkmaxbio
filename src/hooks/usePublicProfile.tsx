
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const usePublicProfile = (slug: string) => {
  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['public-profile', slug],
    queryFn: async () => {
      if (!slug) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: links = [], isLoading: linksLoading, error: linksError } = useQuery({
    queryKey: ['public-links', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];
      
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', profile.id)
        .eq('active', true)
        .order('position', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!profile?.id,
  });

  return {
    profile,
    links,
    isLoading: profileLoading || linksLoading,
    error: profileError || linksError,
  };
};

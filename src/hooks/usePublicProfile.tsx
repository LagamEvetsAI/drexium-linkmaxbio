
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const usePublicProfile = (identifier: string) => {
  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['public-profile', identifier],
    queryFn: async () => {
      if (!identifier) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`username.eq.${identifier},slug.eq.${identifier}`)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!identifier,
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

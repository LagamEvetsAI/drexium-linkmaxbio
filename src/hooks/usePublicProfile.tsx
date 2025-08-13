
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const usePublicProfile = (identifier: string) => {
  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['public-profile', identifier],
    queryFn: async () => {
      if (!identifier) return null;
      
      // First try to find by username
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', identifier)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile by username:', error);
      }

      // If not found by username, try by slug
      if (!data && !error) {
        const slugResult = await supabase
          .from('profiles')
          .select('*')
          .eq('slug', identifier)
          .maybeSingle();

        if (slugResult.error) {
          console.error('Error fetching profile by slug:', slugResult.error);
          throw slugResult.error;
        }

        data = slugResult.data;
      }
      
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

      if (error) {
        console.error('Error fetching links:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!profile?.id,
  });

  const { data: socialLinks = [], isLoading: socialLoading } = useQuery({
    queryKey: ['public-social-links', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];
      
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .eq('user_id', profile.id)
        .eq('active', true)
        .order('platform', { ascending: true });

      if (error) {
        console.error('Error fetching social links:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!profile?.id,
  });

  return {
    profile,
    links,
    socialLinks,
    isLoading: profileLoading || linksLoading || socialLoading,
    error: profileError || linksError,
  };
};

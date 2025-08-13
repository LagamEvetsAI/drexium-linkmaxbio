
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const usePublicProfile = (identifier: string) => {
  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['public-profile', identifier],
    queryFn: async () => {
      if (!identifier) return null;
      
      console.log('Fetching public profile for identifier:', identifier);
      
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
        console.log('Profile not found by username, trying slug...');
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
      
      console.log('Public profile data found:', data);
      
      // Load social links from localStorage if available
      if (data?.id) {
        const socialLinksData = localStorage.getItem(`social_links_${data.id}`);
        if (socialLinksData) {
          try {
            (data as any).social_links = JSON.parse(socialLinksData);
          } catch (e) {
            console.error('Error parsing social links:', e);
          }
        }
      }
      
      return data;
    },
    enabled: !!identifier,
  });

  const { data: links = [], isLoading: linksLoading, error: linksError } = useQuery({
    queryKey: ['public-links', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];
      
      console.log('Fetching links for profile:', profile.id);
      
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
      
      console.log('Links data:', data);
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


import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const usePublicProfile = (identifier: string) => {
  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['public-profile', identifier],
    queryFn: async () => {
      if (!identifier) return null;
      
      console.log('Fetching public profile for identifier:', identifier);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`username.eq.${identifier},slug.eq.${identifier}`)
        .maybeSingle();

      if (error) {
        console.error('Error fetching public profile:', error);
        throw error;
      }
      
      console.log('Public profile data:', data);
      
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

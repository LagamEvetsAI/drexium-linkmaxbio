
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useClickAnalytics = () => {
  const { user } = useAuth();
  
  const { data: clickStats, isLoading: statsLoading } = useQuery({
    queryKey: ['click-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      // Get total clicks for all user's links
      const { data: totalClicks, error: totalError } = await supabase
        .from('link_clicks')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id);
      
      if (totalError) throw totalError;
      
      // Get clicks per link
      const { data: clicksPerLink, error: linksError } = await supabase
        .from('link_clicks')
        .select(`
          link_id,
          links!inner(title, url),
          count
        `)
        .eq('user_id', user.id);
      
      if (linksError) throw linksError;
      
      // Get recent clicks with details
      const { data: recentClicks, error: recentError } = await supabase
        .from('link_clicks')
        .select(`
          *,
          links!inner(title, url)
        `)
        .eq('user_id', user.id)
        .order('clicked_at', { ascending: false })
        .limit(10);
      
      if (recentError) throw recentError;
      
      return {
        totalClicks: totalClicks?.length || 0,
        clicksPerLink,
        recentClicks,
      };
    },
    enabled: !!user?.id,
  });
  
  return {
    clickStats,
    isLoading: statsLoading,
  };
};

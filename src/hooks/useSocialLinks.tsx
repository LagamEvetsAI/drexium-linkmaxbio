
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type SocialLink = Tables<'social_links'>;
type SocialLinkInsert = TablesInsert<'social_links'>;
type SocialLinkUpdate = TablesUpdate<'social_links'>;

export interface SocialLinkData {
  platform: string;
  url: string;
  active: boolean;
}

export const useSocialLinks = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: socialLinks = [], isLoading, error } = useQuery({
    queryKey: ['social-links', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .eq('user_id', user.id)
        .order('platform', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const upsertSocialLinkMutation = useMutation({
    mutationFn: async (linkData: SocialLinkData) => {
      if (!user?.id) throw new Error('User not authenticated');

      // Validate URL format
      if (linkData.url && !isValidUrl(linkData.url)) {
        throw new Error('Invalid URL format');
      }

      const { data, error } = await supabase
        .from('social_links')
        .upsert({
          user_id: user.id,
          platform: linkData.platform,
          url: linkData.url.trim(),
          active: linkData.active,
        }, {
          onConflict: 'user_id,platform'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-links', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['public-profile'] });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao salvar link social. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const deleteSocialLinkMutation = useMutation({
    mutationFn: async (platform: string) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('social_links')
        .delete()
        .eq('user_id', user.id)
        .eq('platform', platform);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-links', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['public-profile'] });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao remover link social. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Simple URL validation
  const isValidUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  return {
    socialLinks,
    isLoading,
    error,
    upsertSocialLink: upsertSocialLinkMutation.mutate,
    deleteSocialLink: deleteSocialLinkMutation.mutate,
    isUpdating: upsertSocialLinkMutation.isPending || deleteSocialLinkMutation.isPending,
  };
};

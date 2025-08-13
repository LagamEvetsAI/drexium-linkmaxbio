
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;
type ProfileInsert = TablesInsert<'profiles'>;
type ProfileUpdate = TablesUpdate<'profiles'>;

export const useProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: ProfileUpdate) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['public-profile'] });
    },
    onError: (error) => {
      console.error('Profile mutation error:', error);
    },
  });

  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    if (!username || username.length < 3) return false;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .maybeSingle();

    if (error) return false;
    return !data;
  };

  const checkFirstLogin = () => {
    if (!user?.id) return false;
    const hasSeenTutorial = localStorage.getItem(`tutorial-seen-${user.id}`);
    const skipTutorial = localStorage.getItem(`skip-tutorial-${user.id}`);
    return !hasSeenTutorial && !skipTutorial;
  };

  const markTutorialSeen = () => {
    if (user?.id) {
      localStorage.setItem(`tutorial-seen-${user.id}`, 'true');
    }
  };

  const skipTutorialPermanently = () => {
    if (user?.id) {
      localStorage.setItem(`skip-tutorial-${user.id}`, 'true');
      localStorage.setItem(`tutorial-seen-${user.id}`, 'true');
    }
  };

  // Clean up localStorage when user changes (including logout)
  useEffect(() => {
    if (!user?.id) {
      // Clean up any leftover localStorage data when user logs out
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes('social_links_') || key.includes('tutorial-') || key.includes('skip-tutorial-')) {
          localStorage.removeItem(key);
        }
      });
    }
  }, [user?.id]);

  // Create a wrapped updateProfile function that accepts callbacks
  const updateProfile = (updates: ProfileUpdate, callbacks?: { onSuccess?: (data: any) => void, onError?: (error: any) => void }) => {
    return updateProfileMutation.mutate(updates, {
      onSuccess: callbacks?.onSuccess,
      onError: callbacks?.onError,
    });
  };

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    isUpdating: updateProfileMutation.isPending,
    checkUsernameAvailability,
    checkFirstLogin,
    markTutorialSeen,
    skipTutorialPermanently,
  };
};

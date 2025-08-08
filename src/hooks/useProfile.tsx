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

      console.log('Updating profile with data:', updates);

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
      
      console.log('Profile updated successfully:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('Profile mutation success, invalidating queries...');
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
    const hasSeenTutorial = localStorage.getItem(`tutorial-seen-${user?.id}`);
    const skipTutorial = localStorage.getItem(`skip-tutorial-${user?.id}`);
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

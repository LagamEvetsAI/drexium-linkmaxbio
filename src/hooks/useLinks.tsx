
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Link = Tables<'links'>;
type LinkInsert = TablesInsert<'links'>;
type LinkUpdate = TablesUpdate<'links'>;

export interface LinkData {
  id?: number;
  title: string;
  url: string;
  active: boolean;
  position?: number;
}

export const useLinks = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: links = [], isLoading, error } = useQuery({
    queryKey: ['links', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', user.id)
        .order('position', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const createLinkMutation = useMutation({
    mutationFn: async (linkData: Omit<LinkData, 'id'>) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('links')
        .insert({
          user_id: user.id,
          title: linkData.title,
          url: linkData.url,
          active: linkData.active,
          position: linkData.position || links.length,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links', user?.id] });
      toast({
        title: "Sucesso",
        description: "Link adicionado com sucesso!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao adicionar link. Tente novamente.",
        variant: "destructive",
      });
      console.error('Error creating link:', error);
    },
  });

  const updateLinkMutation = useMutation({
    mutationFn: async ({ id, ...updates }: LinkUpdate & { id: string }) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('links')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links', user?.id] });
      toast({
        title: "Sucesso",
        description: "Link atualizado com sucesso!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar link. Tente novamente.",
        variant: "destructive",
      });
      console.error('Error updating link:', error);
    },
  });

  const deleteLinkMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links', user?.id] });
      toast({
        title: "Link removido",
        description: "O link foi removido da sua página.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao remover link. Tente novamente.",
        variant: "destructive",
      });
      console.error('Error deleting link:', error);
    },
  });

  return {
    links,
    isLoading,
    error,
    createLink: createLinkMutation.mutate,
    updateLink: updateLinkMutation.mutate,
    deleteLink: deleteLinkMutation.mutate,
    isCreating: createLinkMutation.isPending,
    isUpdating: updateLinkMutation.isPending,
    isDeleting: deleteLinkMutation.isPending,
  };
};

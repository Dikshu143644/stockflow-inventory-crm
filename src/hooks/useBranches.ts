import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Branch } from '@/types/database';

export interface BranchFilters {
  search?: string;
  is_active?: boolean;
  page?: number;
  pageSize?: number;
}

export function useBranches(filters: BranchFilters = {}) {
  const { page = 1, pageSize = 20, search, is_active } = filters;

  return useQuery({
    queryKey: ['branches', { page, pageSize, search, is_active }],
    queryFn: async () => {
      let query = supabase
        .from('branches')
        .select('*', { count: 'exact' });

      if (search) {
        // Sanitize search input: escape PostgREST filter metacharacters
        const sanitized = search.replace(/[%.,()\\]/g, '');
        if (sanitized) {
          query = query.or(`name.ilike.%${sanitized}%,code.ilike.%${sanitized}%,city.ilike.%${sanitized}%`);
        }
      }
      if (is_active !== undefined) {
        query = query.eq('is_active', is_active);
      }

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to).order('created_at', { ascending: false });

      const { data, error, count } = await query;
      if (error) throw error;
      return {
        data: data as Branch[],
        count: count ?? 0,
        page,
        pageSize,
        totalPages: Math.ceil((count ?? 0) / pageSize),
      };
    },
  });
}

export function useBranch(id: string | undefined) {
  return useQuery({
    queryKey: ['branches', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('branches')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Branch;
    },
    enabled: !!id,
  });
}

export function useCreateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (branch: Omit<Branch, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('branches')
        .insert(branch)
        .select()
        .single();
      if (error) throw error;
      return data as Branch;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
  });
}

export function useUpdateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Branch> & { id: string }) => {
      const { data, error } = await supabase
        .from('branches')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as Branch;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      queryClient.setQueryData(['branches', data.id], data);
    },
  });
}

export function useDeleteBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('branches')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
  });
}

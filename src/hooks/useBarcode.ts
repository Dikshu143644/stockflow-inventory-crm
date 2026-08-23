import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types/database';

export function useProductByBarcode(barcode: string) {
  return useQuery({
    queryKey: ['products', 'barcode', barcode],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('barcode', barcode)
        .single();
      if (error) throw error;
      return data as Product;
    },
    enabled: !!barcode,
    retry: (failureCount, error) => {
      // Don't retry on 404 (PGRST116 = row not found) - product genuinely doesn't exist
      if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
        return false;
      }
      // Retry up to 2 times on transient/network errors
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
}

export function useGenerateBarcode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, barcode }: { productId: string; barcode: string }) => {
      const { data, error } = await supabase
        .from('products')
        .update({ barcode })
        .eq('id', productId)
        .select()
        .single();
      if (error) throw error;
      return data as Product;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.setQueryData(['products', data.id], data);
      queryClient.invalidateQueries({ queryKey: ['products', 'barcode'] });
    },
  });
}

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
    retry: false,
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

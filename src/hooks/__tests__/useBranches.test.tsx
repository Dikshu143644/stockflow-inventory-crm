import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

// Mock supabase before importing the hook
const mockQueryBuilder = {
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  or: vi.fn().mockReturnThis(),
  range: vi.fn().mockReturnThis(),
  order: vi.fn().mockResolvedValue({ data: [], error: null, count: 0 }),
  single: vi.fn().mockResolvedValue({ data: null, error: null }),
};

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => mockQueryBuilder),
  },
}));

import { useBranches } from '@/hooks/useBranches';
import { supabase } from '@/lib/supabase';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useBranches', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the chain - order is the terminal call
    mockQueryBuilder.select.mockReturnValue(mockQueryBuilder);
    mockQueryBuilder.or.mockReturnValue(mockQueryBuilder);
    mockQueryBuilder.eq.mockReturnValue(mockQueryBuilder);
    mockQueryBuilder.range.mockReturnValue(mockQueryBuilder);
    mockQueryBuilder.order.mockResolvedValue({ data: [], error: null, count: 0 });
  });

  it('returns expected structure with data and isLoading', () => {
    const { result } = renderHook(() => useBranches(), {
      wrapper: createWrapper(),
    });

    expect(result.current).toHaveProperty('data');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('error');
  });

  it('calls supabase.from with branches table', async () => {
    renderHook(() => useBranches(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('branches');
    });
  });

  it('applies search filter when provided', async () => {
    renderHook(() => useBranches({ search: 'Mumbai' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockQueryBuilder.or).toHaveBeenCalledWith(
        'name.ilike.%Mumbai%,code.ilike.%Mumbai%,city.ilike.%Mumbai%'
      );
    });
  });

  it('applies is_active filter when provided', async () => {
    renderHook(() => useBranches({ is_active: true }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockQueryBuilder.eq).toHaveBeenCalledWith('is_active', true);
    });
  });

  it('applies pagination with range', async () => {
    renderHook(() => useBranches({ page: 2, pageSize: 10 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockQueryBuilder.range).toHaveBeenCalledWith(10, 19);
    });
  });

  it('returns transformed data on success', async () => {
    const mockData = [
      { id: '1', name: 'Mumbai HQ', code: 'MUM', is_active: true },
      { id: '2', name: 'Delhi', code: 'DEL', is_active: true },
    ];
    mockQueryBuilder.order.mockResolvedValueOnce({ data: mockData, error: null, count: 2 });

    const { result } = renderHook(() => useBranches(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({
        data: mockData,
        count: 2,
        page: 1,
        pageSize: 20,
        totalPages: 1,
      });
    });
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { BranchProvider, useBranchContext } from '@/contexts/BranchContext';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BranchProvider>{children}</BranchProvider>
);

describe('BranchContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders children within BranchProvider', () => {
    const { result } = renderHook(() => useBranchContext(), { wrapper });
    expect(result.current).toBeDefined();
    expect(result.current.setCurrentBranch).toBeInstanceOf(Function);
  });

  it('defaults to null (equivalent to "all") when no localStorage value', () => {
    const { result } = renderHook(() => useBranchContext(), { wrapper });
    expect(result.current.currentBranchId).toBeNull();
  });

  it('stores and retrieves branch selection via context', () => {
    const { result } = renderHook(() => useBranchContext(), { wrapper });

    act(() => {
      result.current.setCurrentBranch('branch-1');
    });

    expect(result.current.currentBranchId).toBe('branch-1');
  });

  it('persists branch selection to localStorage', () => {
    const { result } = renderHook(() => useBranchContext(), { wrapper });

    act(() => {
      result.current.setCurrentBranch('branch-2');
    });

    expect(localStorage.getItem('stockflow_selected_branch')).toBe('branch-2');
  });

  it('removes localStorage value when branch is set to null', () => {
    localStorage.setItem('stockflow_selected_branch', 'branch-3');
    const { result } = renderHook(() => useBranchContext(), { wrapper });

    act(() => {
      result.current.setCurrentBranch(null);
    });

    expect(result.current.currentBranchId).toBeNull();
    expect(localStorage.getItem('stockflow_selected_branch')).toBeNull();
  });

  it('reads initial value from localStorage', () => {
    localStorage.setItem('stockflow_selected_branch', 'branch-saved');
    const { result } = renderHook(() => useBranchContext(), { wrapper });
    expect(result.current.currentBranchId).toBe('branch-saved');
  });

  it('throws error when used outside BranchProvider', () => {
    expect(() => {
      renderHook(() => useBranchContext());
    }).toThrow('useBranchContext must be used within a BranchProvider');
  });
});

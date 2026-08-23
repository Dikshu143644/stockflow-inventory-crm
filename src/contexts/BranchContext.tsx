import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface BranchState {
  currentBranchId: string | null;
  setCurrentBranch: (branchId: string | null) => void;
}

const BranchContext = createContext<BranchState | null>(null);

const BRANCH_STORAGE_KEY = 'stockflow_selected_branch';

interface BranchProviderProps {
  children: ReactNode;
}

export function BranchProvider({ children }: BranchProviderProps) {
  const [currentBranchId, setCurrentBranchId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(BRANCH_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const setCurrentBranch = useCallback((branchId: string | null) => {
    setCurrentBranchId(branchId);
    try {
      if (branchId) {
        localStorage.setItem(BRANCH_STORAGE_KEY, branchId);
      } else {
        localStorage.removeItem(BRANCH_STORAGE_KEY);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  return (
    <BranchContext.Provider value={{ currentBranchId, setCurrentBranch }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranchContext() {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranchContext must be used within a BranchProvider');
  }
  return context;
}

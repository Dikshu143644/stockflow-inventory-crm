import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { BranchSelector } from '@/components/layout/BranchSelector';

// Mock the useBranches hook
vi.mock('@/hooks/useBranches', () => ({
  useBranches: () => ({
    data: {
      data: [
        { id: '1', name: 'Mumbai HQ', code: 'MUM', is_active: true },
        { id: '2', name: 'Delhi', code: 'DEL', is_active: true },
      ],
      count: 2,
      page: 1,
      pageSize: 100,
      totalPages: 1,
    },
    isLoading: false,
    error: null,
  }),
}));

describe('BranchSelector', () => {
  it('renders the select trigger', () => {
    render(<BranchSelector />);
    // Radix Select renders a trigger button with role combobox
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
  });

  it('shows "All Branches" as the default selected value', () => {
    render(<BranchSelector />);
    expect(screen.getByText('All Branches')).toBeInTheDocument();
  });

  it('renders with the Building2 icon', () => {
    const { container } = render(<BranchSelector />);
    // lucide-react renders an svg element
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});

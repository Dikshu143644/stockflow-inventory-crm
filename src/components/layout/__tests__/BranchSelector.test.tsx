import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { BranchSelector } from '@/components/layout/BranchSelector';

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

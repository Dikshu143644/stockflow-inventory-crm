import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { BarcodeDisplay } from '@/components/shared/BarcodeDisplay';

// Mock react-barcode since it renders canvas/svg which jsdom cannot handle
vi.mock('react-barcode', () => ({
  default: ({ value, displayValue }: { value: string; displayValue?: boolean }) => (
    <div data-testid="barcode-mock">
      {displayValue && <span>{value}</span>}
    </div>
  ),
}));

describe('BarcodeDisplay', () => {
  it('renders with a barcode value', () => {
    render(<BarcodeDisplay value="ABC123456" />);
    const elements = screen.getAllByText('ABC123456');
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });

  it('shows the barcode mock component', () => {
    render(<BarcodeDisplay value="TEST-CODE" />);
    expect(screen.getByTestId('barcode-mock')).toBeInTheDocument();
  });

  it('shows copy button', () => {
    render(<BarcodeDisplay value="COPY-ME" />);
    const copyButton = screen.getByTitle('Copy barcode value');
    expect(copyButton).toBeInTheDocument();
  });

  it('renders the value text in the mono font span', () => {
    render(<BarcodeDisplay value="MONO-TEXT" />);
    const valueElements = screen.getAllByText('MONO-TEXT');
    expect(valueElements.length).toBeGreaterThanOrEqual(1);
  });

  it('does not crash with an empty string value', () => {
    expect(() => render(<BarcodeDisplay value="" />)).not.toThrow();
  });

  it('applies custom className', () => {
    const { container } = render(<BarcodeDisplay value="STYLED" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

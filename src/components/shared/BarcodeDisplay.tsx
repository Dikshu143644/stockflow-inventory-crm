import { useState } from 'react';
import Barcode from 'react-barcode';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BarcodeDisplayProps {
  value: string;
  format?: 'CODE128' | 'EAN13' | 'UPC' | 'CODE39' | 'ITF14';
  width?: number;
  height?: number;
  className?: string;
}

export function BarcodeDisplay({
  value,
  format = 'CODE128',
  width = 2,
  height = 60,
  className,
}: BarcodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for environments without clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div className="rounded-[12px] bg-white p-4">
        <Barcode
          value={value}
          format={format}
          width={width}
          height={height}
          displayValue={true}
          background="#ffffff"
          lineColor="#000000"
          fontSize={12}
          margin={8}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground font-mono">{value}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={handleCopy}
          title="Copy barcode value"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    </div>
  );
}

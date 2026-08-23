import { useEffect, useRef, useState, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, CameraOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BarcodeScannerProps {
  onScan: (code: string) => void;
  onClose?: () => void;
  isOpen?: boolean;
  className?: string;
}

export function BarcodeScanner({ onScan, onClose, isOpen = true, className }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scannerIdRef = useRef(`barcode-scanner-${Date.now()}`);

  const stopScanning = useCallback(async () => {
    if (scannerRef.current) {
      try {
        const state = scannerRef.current.getState();
        if (state === 2) {
          // SCANNING state
          await scannerRef.current.stop();
        }
      } catch {
        // Scanner may already be stopped
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
  }, []);

  const startScanning = useCallback(async () => {
    setError(null);

    try {
      const scannerId = scannerIdRef.current;
      const element = document.getElementById(scannerId);
      if (!element) {
        setError('Scanner container not found. Please try again.');
        return;
      }

      const scanner = new Html5Qrcode(scannerId);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 150 },
          aspectRatio: 1.5,
        },
        (decodedText) => {
          onScan(decodedText);
          stopScanning();
        },
        () => {
          // QR code scanning errors (no code found in frame) are expected
        }
      );

      setIsScanning(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start camera';
      if (message.includes('NotAllowedError') || message.includes('Permission')) {
        setError('Camera permission denied. Please allow camera access and try again.');
      } else if (message.includes('NotFoundError') || message.includes('no camera')) {
        setError('No camera found on this device.');
      } else {
        setError(message);
      }
      setIsScanning(false);
    }
  }, [onScan, stopScanning]);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        try {
          const state = scannerRef.current.getState();
          if (state === 2) {
            scannerRef.current.stop();
          }
        } catch {
          // cleanup errors are expected
        }
        scannerRef.current = null;
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'relative rounded-[16px] border border-border bg-card/80 backdrop-blur-xl overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Barcode Scanner</span>
        </div>
        <div className="flex items-center gap-2">
          {onClose && (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Scanner area */}
      <div className="relative p-4">
        <div
          ref={containerRef}
          className="relative min-h-[280px] rounded-[12px] overflow-hidden bg-black/50"
        >
          <div id={scannerIdRef.current} className="w-full" />

          {!isScanning && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground text-center px-4">
                Point your camera at a barcode to scan
              </p>
              <Button onClick={startScanning} className="gap-2">
                <Camera className="h-4 w-4" />
                Start Scanning
              </Button>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
                <CameraOff className="h-8 w-8 text-red-400" />
              </div>
              <p className="text-sm text-red-400 text-center">{error}</p>
              <Button variant="outline" onClick={startScanning} className="gap-2">
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Controls */}
        {isScanning && (
          <div className="mt-4 flex justify-center">
            <Button variant="outline" onClick={stopScanning} className="gap-2">
              <CameraOff className="h-4 w-4" />
              Stop Scanning
            </Button>
          </div>
        )}

        {/* Supported formats info */}
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Supports EAN-13, UPC-A, Code-128, QR Code
        </p>
      </div>
    </div>
  );
}

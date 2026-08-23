import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  ScanBarcode,
  Package,
  Plus,
  Eye,
  SlidersHorizontal,
  ShoppingCart,
  AlertCircle,
  Search,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { BarcodeScanner } from '@/components/shared/BarcodeScanner';
import { BarcodeDisplay } from '@/components/shared/BarcodeDisplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useProductByBarcode } from '@/hooks/useBarcode';

export default function BarcodeScannerPage() {
  const navigate = useNavigate();
  const [scannedCode, setScannedCode] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [showScanner, setShowScanner] = useState(true);

  const activeCode = scannedCode || manualCode;
  const { data: product, isLoading, isError } = useProductByBarcode(activeCode);

  const handleScan = (code: string) => {
    setScannedCode(code);
    setManualCode('');
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      setScannedCode('');
      // Trigger search by keeping manualCode as-is (the hook uses activeCode)
    }
  };

  const handleReset = () => {
    setScannedCode('');
    setManualCode('');
    setShowScanner(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Barcode Scanner"
        description="Scan product barcodes to quickly look up inventory details"
        actions={
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <ScanBarcode className="h-4 w-4" />
            New Scan
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left column: Scanner */}
        <div className="space-y-4">
          {/* Camera scanner */}
          <BarcodeScanner
            onScan={handleScan}
            isOpen={showScanner}
            onClose={() => setShowScanner(false)}
          />

          {/* Manual entry */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Search className="h-4 w-4 text-primary" />
                Manual Barcode Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleManualSearch} className="flex gap-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Enter barcode number..."
                  className="flex-1 rounded-[10px] border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button type="submit" size="sm" disabled={!manualCode.trim()}>
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Last scanned code display */}
          {activeCode && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Scanned Barcode</CardTitle>
              </CardHeader>
              <CardContent>
                <BarcodeDisplay value={activeCode} />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column: Results */}
        <div className="space-y-4">
          {!activeCode && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <ScanBarcode className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Scan a barcode or enter one manually to look up product details
                </p>
              </CardContent>
            </Card>
          )}

          {activeCode && isLoading && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="mt-4 text-sm text-muted-foreground">Looking up product...</p>
              </CardContent>
            </Card>
          )}

          {activeCode && !isLoading && isError && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 mb-4">
                  <AlertCircle className="h-8 w-8 text-amber-400" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">Product Not Found</p>
                <p className="text-xs text-muted-foreground text-center mb-4">
                  No product matches barcode: {activeCode}
                </p>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => navigate('/inventory/products')}
                >
                  <Plus className="h-4 w-4" />
                  Create Product with this Barcode
                </Button>
              </CardContent>
            </Card>
          )}

          {activeCode && !isLoading && product && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    Product Found
                  </CardTitle>
                  <Badge variant={product.is_active ? 'default' : 'secondary'}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.sku}</p>
                  </div>

                  {product.description && (
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  )}

                  <Separator />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Unit Price</p>
                      <p className="text-sm font-medium text-foreground">
                        ${product.unit_price.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Cost Price</p>
                      <p className="text-sm font-medium text-foreground">
                        ${product.cost_price.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Min Stock</p>
                      <p className="text-sm font-medium text-foreground">{product.min_stock_level}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Reorder Point</p>
                      <p className="text-sm font-medium text-foreground">{product.reorder_point}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Quick Actions
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 justify-start"
                        onClick={() => navigate(`/inventory/products/${product.id}`)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 justify-start"
                        onClick={() => navigate('/inventory/adjustments')}
                      >
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        Adjust Stock
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 justify-start"
                        onClick={() => navigate('/sales/orders')}
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        Add to Order
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}

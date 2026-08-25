import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, LayoutDashboard, Package, Users, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const suggestions = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Inventory', href: '/inventory/products', icon: Package },
  { label: 'Customers', href: '/crm/customers', icon: Users },
  { label: 'Sales', href: '/sales/orders', icon: ShoppingCart },
];

export default function NotFoundPage() {
  useDocumentTitle('Page Not Found');

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F7F3] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-[#FF7A00] to-[#FF9A3C] bg-clip-text text-[120px] font-bold leading-none text-transparent sm:text-[180px]"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h2 className="mt-4 text-2xl font-bold text-[#101828]">Page Not Found</h2>
          <p className="mt-2 text-sm text-[#667085] max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
            Let us get you back to familiar territory.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-8"
        >
          <Button asChild size="lg">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Link>
          </Button>
        </motion.div>

        {/* Navigation Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-10"
        >
          <p className="text-xs text-[#667085] uppercase tracking-wider mb-4">
            Or try one of these
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {suggestions.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E7E5E4] bg-white px-4 py-2.5 text-sm font-medium text-[#101828] transition-colors hover:bg-[#FFF1E6] hover:border-[#FF7A00]/30"
              >
                <item.icon className="h-4 w-4 text-[#FF7A00]" />
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

import { useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ScanBarcode,
  ShoppingCart,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const navItems = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'Products', href: '/inventory/products', icon: Package },
  { title: 'Scanner', href: '/inventory/scanner', icon: ScanBarcode },
  { title: 'Orders', href: '/sales/orders', icon: ShoppingCart },
];

export function MobileBottomNav() {
  const location = useLocation();
  const { setMobileOpen } = useSidebar();
  const isMobile = useMediaQuery('(max-width: 767px)');

  if (!isMobile) return null;

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-sidebar-background/95 backdrop-blur-xl safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors touch-target',
                active
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <item.icon className={cn('h-5 w-5', active && 'text-primary')} />
              <span className="text-[10px] font-medium">{item.title}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setMobileOpen(true)}
          className={cn(
            'flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors text-muted-foreground touch-target'
          )}
        >
          <Menu className="h-5 w-5" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </div>
    </nav>
  );
}

import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Handshake,
  Activity,
  BarChart3,
  FileSpreadsheet,
  Bot,
  Settings,
  Shield,
  ScrollText,
} from 'lucide-react';
// NOTE: ERP icons (Package, Warehouse, ArrowRightLeft, FolderTree, Truck,
// ClipboardList, ShoppingCart, FileText) were removed from this import because
// the corresponding ERP command-palette entries are hidden in pure-CRM mode.
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

// Pure-CRM mode: ERP command entries (Inventory, Procurement, Sales groups) are
// hidden so the palette never surfaces routes that redirect away. Restore those
// entries (and their icon imports) to bring ERP navigation back.
const navigationItems = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard, group: 'Navigation' },
  { title: 'Customers', href: '/crm/customers', icon: Users, group: 'CRM' },
  { title: 'Leads', href: '/crm/leads', icon: UserPlus, group: 'CRM' },
  { title: 'Deals', href: '/crm/deals', icon: Handshake, group: 'CRM' },
  { title: 'Activities', href: '/crm/activities', icon: Activity, group: 'CRM' },
  { title: 'Analytics', href: '/reports/analytics', icon: BarChart3, group: 'Reports' },
  { title: 'Excel Export', href: '/reports/export', icon: FileSpreadsheet, group: 'Reports' },
  { title: 'AI Assistant', href: '/ai', icon: Bot, group: 'AI' },
  { title: 'Settings', href: '/settings', icon: Settings, group: 'Settings' },
  { title: 'Users', href: '/settings/users', icon: Users, group: 'Settings' },
  { title: 'Roles', href: '/settings/roles', icon: Shield, group: 'Settings' },
  { title: 'Audit Log', href: '/settings/audit-log', icon: ScrollText, group: 'Settings' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = useCallback(
    (href: string) => {
      navigate(href);
      setOpen(false);
    },
    [navigate]
  );

  const groups = [...new Set(navigationItems.map((item) => item.group))];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map((group, groupIndex) => (
          <div key={group}>
            {groupIndex > 0 && <CommandSeparator />}
            <CommandGroup heading={group}>
              {navigationItems
                .filter((item) => item.group === group)
                .map((item) => (
                  <CommandItem
                    key={item.href}
                    value={item.title}
                    onSelect={() => handleSelect(item.href)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

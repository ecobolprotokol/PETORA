'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PawPrint, LayoutDashboard, Users, Cat, Calendar, Stethoscope, Hotel, Scissors, Package, ShoppingCart, FileText, CreditCard, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useUIStore } from '@/stores/ui-store';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Customers', href: '/dashboard/customers', icon: Users },
  { label: 'Pets', href: '/dashboard/pets', icon: Cat },
  { label: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
  { label: 'Medical Records', href: '/dashboard/medical-records', icon: Stethoscope },
  { label: 'Pet Hotel', href: '/dashboard/pet-hotel', icon: Hotel },
  { label: 'Grooming', href: '/dashboard/grooming', icon: Scissors },
  { label: 'Products', href: '/dashboard/products', icon: Package },
  { label: 'POS', href: '/dashboard/pos', icon: ShoppingCart },
  { label: 'Invoices', href: '/dashboard/invoices', icon: FileText },
  { label: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();

  useEffect(() => {
    if (window.matchMedia('(max-width: 1023px)').matches) {
      setSidebarOpen(false);
    }
  }, [setSidebarOpen]);

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={toggleSidebar} />
      )}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full border-r bg-card shadow-xl transition-all duration-300',
          sidebarOpen ? 'w-72' : 'w-16',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          'lg:block'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between border-b bg-primary px-4 text-primary-foreground">
            {sidebarOpen && (
              <Link href="/dashboard" className="flex items-center gap-3 font-semibold tracking-tight">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-primary-foreground/15">
                  <PawPrint className="size-5" />
                </span>
                <span className="text-lg">Petora</span>
              </Link>
            )}
            <button onClick={toggleSidebar} className="p-2 hover:bg-accent rounded-md">
              {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
                {item.badge && sidebarOpen && (
                  <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

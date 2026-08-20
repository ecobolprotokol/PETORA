'use client';

import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/stores/ui-store';
import { BranchSwitcher } from './branch-switcher';
import { UserMenu } from './user-menu';

export function Header() {
  const { toggleSidebar } = useUIStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background/90 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/70 sm:gap-4 sm:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar} aria-label="Buka menu navigasi">
        <Menu />
      </Button>
      <div className="hidden min-w-0 flex-1 sm:block">
        <p className="truncate text-sm font-medium text-muted-foreground">Ruang kerja Petora</p>
      </div>
      <div className="flex-1 sm:hidden" />
      <BranchSwitcher />
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
      </Button>
      <UserMenu />
    </header>
  );
}

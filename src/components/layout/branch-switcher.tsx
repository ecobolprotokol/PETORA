'use client';

import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUIStore } from '@/stores/ui-store';

export function BranchSwitcher() {
  const { currentBranchId, setCurrentBranch } = useUIStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
        <span className="hidden sm:inline">{currentBranchId ? 'Cabang Utama' : 'Pilih Cabang'}</span>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Pilih Cabang</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setCurrentBranch(null)}>
          Semua Cabang
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrentBranch('main')}>
          Cabang Utama
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

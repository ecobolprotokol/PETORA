'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PawPrint } from 'lucide-react';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="petora-dots flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex size-20 items-center justify-center rounded-[2rem] bg-primary text-primary-foreground shadow-xl shadow-primary/25">
            <PawPrint className="size-10" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Petora</h1>
          <p className="text-muted-foreground">Ruang kerja yang lebih ceria untuk bisnis petcare</p>
        </div>
        <div className="petora-surface rounded-3xl border border-primary/10 p-6 sm:p-8">
          {children}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
          © {new Date().getFullYear()} Petora. All rights reserved.
        </p>
      </div>
    </div>
  );
}

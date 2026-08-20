'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const widgets = [
  'today-appointments',
  'revenue-chart',
  'low-stock',
  'pending-payments',
] as const;

type Widget = typeof widgets[number];

export function DashboardWidgets() {
  const [activeWidgets, setActiveWidgets] = useState<Widget[]>([...widgets]);

  const toggleWidget = (widget: Widget) => {
    setActiveWidgets((prev) =>
      prev.includes(widget) ? prev.filter((w) => w !== widget) : [...prev, widget]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {widgets.map((widget) => (
          <button
            key={widget}
            onClick={() => toggleWidget(widget)}
            className={`px-3 py-1 text-sm rounded-full border ${
              activeWidgets.includes(widget)
                ? 'bg-primary text-primary-foreground'
                : 'bg-background hover:bg-accent'
            }`}
          >
            {widget.replace('-', ' ')}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeWidgets.includes('today-appointments') && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Janji Temu Hari Ini</h3>
            <Link href="/dashboard/appointments" className="text-sm text-primary hover:underline">Buka daftar janji temu</Link>
          </Card>
        )}
        {activeWidgets.includes('revenue-chart') && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Pendapatan</h3>
            <Link href="/dashboard/reports/financial" className="text-sm text-primary hover:underline">Buka laporan keuangan</Link>
          </Card>
        )}
        {activeWidgets.includes('low-stock') && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Stok Menipis</h3>
            <Link href="/dashboard/inventory" className="text-sm text-primary hover:underline">Buka inventori</Link>
          </Card>
        )}
        {activeWidgets.includes('pending-payments') && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Pembayaran Pending</h3>
            <Link href="/dashboard/payments/verification" className="text-sm text-primary hover:underline">Buka verifikasi pembayaran</Link>
          </Card>
        )}
      </div>
    </div>
  );
}

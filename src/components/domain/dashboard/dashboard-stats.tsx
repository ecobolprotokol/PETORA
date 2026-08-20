import { DollarSign, Calendar, Package, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { createSupabaseClient } from '@/lib/supabase/server';

interface DashboardMetric {
  title: string;
  value: string;
  icon: typeof DollarSign;
  detail: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

export async function DashboardStats(): Promise<React.ReactNode> {
  const supabase = await createSupabaseClient();
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();

  const [invoices, appointments, products, payments] = await Promise.all([
    supabase.from('invoices').select('total').gte('created_at', startOfDay).lt('created_at', endOfDay),
    supabase.from('appointments').select('id', { count: 'exact', head: true }).gte('scheduled_at', startOfDay).lt('scheduled_at', endOfDay),
    supabase.from('products').select('stock_quantity, reorder_level').eq('is_active', true),
    supabase.from('payments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);

  const revenue = (invoices.data ?? []).reduce((sum, invoice) => sum + Number(invoice.total ?? 0), 0);
  const lowStock = (products.data ?? []).filter((product) => product.stock_quantity <= product.reorder_level).length;
  const metrics: DashboardMetric[] = [
    { title: 'Pendapatan Hari Ini', value: formatCurrency(revenue), icon: DollarSign, detail: 'Invoice hari ini' },
    { title: 'Janji Temu Hari Ini', value: String(appointments.count ?? 0), icon: Calendar, detail: 'Jadwal hari ini' },
    { title: 'Stok Menipis', value: String(lowStock), icon: Package, detail: 'Produk perlu restok' },
    { title: 'Pembayaran Pending', value: String(payments.count ?? 0), icon: Clock, detail: 'Menunggu verifikasi' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="mt-2 text-2xl font-bold">{metric.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{metric.detail}</p>
        </Card>
      ))}
    </div>
  );
}

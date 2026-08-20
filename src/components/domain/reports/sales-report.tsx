import { createSupabaseClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';

interface SalesRow { id: string; total_amount: number | null; status: string | null; created_at: string }

export async function SalesReport(): Promise<React.ReactElement> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.from('invoices').select('id,total_amount,status,created_at').order('created_at', { ascending: false }).limit(50);
  const rows = (data ?? []) as SalesRow[];
  return <Card className="p-6"><div className="space-y-4"><h2 className="text-lg font-semibold">Transaksi terbaru</h2>{error ? <p className="text-destructive">Data penjualan tidak dapat dimuat.</p> : rows.length === 0 ? <p className="text-muted-foreground">Belum ada transaksi penjualan.</p> : <div className="space-y-3">{rows.map((row) => <div key={row.id} className="flex items-center justify-between border-b border-border pb-3"><div><p className="font-medium">{row.id}</p><p className="text-sm text-muted-foreground">{new Date(row.created_at).toLocaleDateString('id-ID')} · {row.status ?? 'UNKNOWN'}</p></div><p className="font-medium">Rp {(row.total_amount ?? 0).toLocaleString('id-ID')}</p></div>)}</div>}</div></Card>;
}

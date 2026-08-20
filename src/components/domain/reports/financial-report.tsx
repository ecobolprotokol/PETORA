import { createSupabaseClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';

interface PaymentRow { id: string; amount: number | null; status: string | null; created_at: string }

export async function FinancialReport(): Promise<React.ReactElement> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.from('payments').select('id,amount,status,created_at').order('created_at', { ascending: false }).limit(50);
  const rows = (data ?? []) as PaymentRow[];
  return <Card className="p-6"><div className="space-y-4"><h2 className="text-lg font-semibold">Aktivitas pembayaran</h2>{error ? <p className="text-destructive">Data keuangan tidak dapat dimuat.</p> : rows.length === 0 ? <p className="text-muted-foreground">Belum ada data pembayaran.</p> : <div className="space-y-3">{rows.map((row) => <div key={row.id} className="flex items-center justify-between border-b border-border pb-3"><div><p className="font-medium">{row.id}</p><p className="text-sm text-muted-foreground">{new Date(row.created_at).toLocaleDateString('id-ID')} · {row.status ?? 'UNKNOWN'}</p></div><p className="font-medium">Rp {(row.amount ?? 0).toLocaleString('id-ID')}</p></div>)}</div>}</div></Card>;
}

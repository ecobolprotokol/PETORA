import { createSupabaseClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';

interface InventoryRow { id: string; name: string; stock: number | null; min_stock: number | null }

export async function InventoryReport(): Promise<React.ReactElement> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.from('products').select('id,name,stock,min_stock').order('stock', { ascending: true }).limit(50);
  const rows = (data ?? []) as InventoryRow[];
  return <Card className="p-6"><div className="space-y-4"><h2 className="text-lg font-semibold">Status stok produk</h2>{error ? <p className="text-destructive">Data inventori tidak dapat dimuat.</p> : rows.length === 0 ? <p className="text-muted-foreground">Belum ada data produk.</p> : <div className="space-y-3">{rows.map((row) => <div key={row.id} className="flex items-center justify-between border-b border-border pb-3"><p className="font-medium">{row.name}</p><p className={(row.stock ?? 0) <= (row.min_stock ?? 0) ? 'text-destructive font-medium' : 'text-muted-foreground'}>{row.stock ?? 0} tersedia</p></div>)}</div>}</div></Card>;
}

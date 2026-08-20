import { SettingsLayout } from '@/components/domain/settings/settings-layout';
import { CategorySettingsForm } from '@/components/domain/settings/category-settings-form';

export default function InventorySettingsPage() {
  return <SettingsLayout><div className="space-y-6"><div><h1 className="text-3xl font-bold">Inventory Settings</h1><p className="text-muted-foreground">Konfigurasi inventori dan stok</p></div><CategorySettingsForm category="INVENTORY" fields={[{ key: 'default_warehouse', label: 'Gudang default', description: 'Nama gudang yang digunakan untuk transaksi baru.', type: 'text', defaultValue: '' }, { key: 'low_stock_alert', label: 'Peringatan stok minimum', description: 'Tampilkan peringatan saat stok mencapai batas minimum.', type: 'boolean', defaultValue: true }, { key: 'reorder_threshold', label: 'Batas reorder', description: 'Jumlah stok pemicu pengadaan ulang.', type: 'number', defaultValue: 0 }, { key: 'costing_method', label: 'Metode costing', description: 'Metode perhitungan biaya stok.', type: 'text', defaultValue: 'FIFO' }]} /></div></SettingsLayout>;
}

import { SettingsLayout } from '@/components/domain/settings/settings-layout';
import { CategorySettingsForm } from '@/components/domain/settings/category-settings-form';

export default function PrinterSettingsPage() {
  return <SettingsLayout><div className="space-y-6"><div><h1 className="text-3xl font-bold">Printer Settings</h1><p className="text-muted-foreground">Konfigurasi printer dan label</p></div><CategorySettingsForm category="PRINTER" fields={[{ key: 'receipt_width', label: 'Lebar struk', description: 'Lebar kertas printer dalam milimeter.', type: 'number', defaultValue: 80 }, { key: 'auto_print_receipt', label: 'Cetak struk otomatis', description: 'Cetak struk setelah pembayaran berhasil.', type: 'boolean', defaultValue: false }, { key: 'barcode_enabled', label: 'Cetak barcode', description: 'Sertakan barcode pada struk.', type: 'boolean', defaultValue: true }, { key: 'label_printer_enabled', label: 'Printer label aktif', description: 'Aktifkan pencetakan label produk.', type: 'boolean', defaultValue: false }]} /></div></SettingsLayout>;
}

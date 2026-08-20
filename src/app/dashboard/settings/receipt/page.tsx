import { SettingsLayout } from '@/components/domain/settings/settings-layout';
import { CategorySettingsForm } from '@/components/domain/settings/category-settings-form';

export default function ReceiptSettingsPage() {
  return <SettingsLayout><div className="space-y-6"><div><h1 className="text-3xl font-bold">Receipt Settings</h1><p className="text-muted-foreground">Konfigurasi struk pembayaran</p></div><CategorySettingsForm category="RECEIPT" fields={[{ key: 'header', label: 'Header struk', description: 'Teks yang tampil di bagian atas struk.', type: 'text', defaultValue: '' }, { key: 'footer', label: 'Footer struk', description: 'Teks penutup pada struk pembayaran.', type: 'text', defaultValue: 'Terima kasih atas kunjungan Anda.' }, { key: 'show_customer_phone', label: 'Tampilkan nomor pelanggan', description: 'Sertakan nomor telepon pelanggan pada struk.', type: 'boolean', defaultValue: true }, { key: 'show_tax_breakdown', label: 'Tampilkan rincian pajak', description: 'Sertakan rincian pajak pada struk.', type: 'boolean', defaultValue: true }]} /></div></SettingsLayout>;
}

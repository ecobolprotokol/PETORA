import { SettingsLayout } from '@/components/domain/settings/settings-layout';
import { CategorySettingsForm } from '@/components/domain/settings/category-settings-form';

export default function AdvancedSettingsPage() {
  return <SettingsLayout><div className="space-y-6"><div><h1 className="text-3xl font-bold">Advanced Settings</h1><p className="text-muted-foreground">Pengaturan lanjutan aplikasi</p></div><CategorySettingsForm category="ADVANCED" fields={[{ key: 'maintenance_mode', label: 'Mode maintenance', description: 'Batasi akses operasional saat pemeliharaan berlangsung.', type: 'boolean', defaultValue: false }, { key: 'debug_logging', label: 'Log debug', description: 'Simpan detail tambahan untuk diagnosis sistem.', type: 'boolean', defaultValue: false }, { key: 'default_language', label: 'Bahasa default', description: 'Bahasa tampilan aplikasi untuk pengguna baru.', type: 'text', defaultValue: 'id' }, { key: 'currency', label: 'Mata uang', description: 'Kode mata uang transaksi bisnis.', type: 'text', defaultValue: 'IDR' }]} /></div></SettingsLayout>;
}

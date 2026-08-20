import { SettingsLayout } from '@/components/domain/settings/settings-layout';
import { CategorySettingsForm } from '@/components/domain/settings/category-settings-form';

export default function EmployeesSettingsPage() {
  return <SettingsLayout><div className="space-y-6"><div><h1 className="text-3xl font-bold">Employee Settings</h1><p className="text-muted-foreground">Konfigurasi karyawan dan komisi</p></div><CategorySettingsForm category="EMPLOYEE" fields={[{ key: 'commission_enabled', label: 'Aktifkan komisi', description: 'Hitung komisi berdasarkan layanan yang selesai.', type: 'boolean', defaultValue: false }, { key: 'default_commission_rate', label: 'Tarif komisi default', description: 'Persentase komisi default untuk karyawan.', type: 'number', defaultValue: 0 }, { key: 'performance_tracking', label: 'Pelacakan performa', description: 'Simpan metrik performa karyawan.', type: 'boolean', defaultValue: true }, { key: 'require_shift_open', label: 'Wajib buka shift', description: 'Karyawan harus membuka shift sebelum transaksi.', type: 'boolean', defaultValue: true }]} /></div></SettingsLayout>;
}

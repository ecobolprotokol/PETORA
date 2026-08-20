import { SettingsLayout } from '@/components/domain/settings/settings-layout';
import { CategorySettingsForm } from '@/components/domain/settings/category-settings-form';

export default function BranchesSettingsPage() {
  return <SettingsLayout><div className="space-y-6"><div><h1 className="text-3xl font-bold">Branches</h1><p className="text-muted-foreground">Kelola konfigurasi cabang toko</p></div><CategorySettingsForm category="GENERAL" fields={[{ key: 'branches_enabled', label: 'Aktifkan multi-cabang', description: 'Pisahkan data operasional berdasarkan cabang.', type: 'boolean', defaultValue: false }, { key: 'current_branch_id', label: 'ID cabang aktif', description: 'Identitas cabang yang digunakan pada sesi ini.', type: 'text', defaultValue: '' }, { key: 'branch_name', label: 'Nama cabang', description: 'Nama cabang untuk identifikasi operasional.', type: 'text', defaultValue: '' }, { key: 'branch_phone', label: 'Telepon cabang', description: 'Nomor telepon cabang yang aktif.', type: 'text', defaultValue: '' }]} /></div></SettingsLayout>;
}

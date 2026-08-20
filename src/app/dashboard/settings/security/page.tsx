import { SettingsLayout } from '@/components/domain/settings/settings-layout';
import { CategorySettingsForm } from '@/components/domain/settings/category-settings-form';

export default function SecuritySettingsPage() {
  return <SettingsLayout><div className="space-y-6"><div><h1 className="text-3xl font-bold">Security Settings</h1><p className="text-muted-foreground">Konfigurasi keamanan sesi dan akun</p></div><CategorySettingsForm category="SECURITY" fields={[{ key: 'session_timeout_minutes', label: 'Batas waktu sesi', description: 'Sesi staff berakhir setelah tidak aktif selama beberapa menit.', type: 'number', defaultValue: 30 }, { key: 'failed_login_limit', label: 'Batas percobaan login', description: 'Jumlah kegagalan sebelum akses dikunci sementara.', type: 'number', defaultValue: 5 }, { key: 'require_pin', label: 'Wajibkan PIN staff', description: 'Minta PIN untuk tindakan operasional sensitif.', type: 'boolean', defaultValue: true }, { key: 'two_factor_enabled', label: 'Two-factor authentication', description: 'Aktifkan autentikasi dua langkah untuk akun yang mendukungnya.', type: 'boolean', defaultValue: false }]} /></div></SettingsLayout>;
}

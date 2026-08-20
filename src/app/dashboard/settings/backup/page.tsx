import { SettingsLayout } from '@/components/domain/settings/settings-layout';
import { CategorySettingsForm } from '@/components/domain/settings/category-settings-form';

export default function BackupSettingsPage() {
  return <SettingsLayout><div className="space-y-6"><div><h1 className="text-3xl font-bold">Backup Settings</h1><p className="text-muted-foreground">Konfigurasi jadwal dan retensi backup</p></div><CategorySettingsForm category="BACKUP" fields={[{ key: 'enabled', label: 'Backup otomatis', description: 'Aktifkan jadwal backup data bisnis.', type: 'boolean', defaultValue: false }, { key: 'schedule', label: 'Jadwal backup', description: 'Jadwal cron atau interval yang digunakan sistem.', type: 'text', defaultValue: 'daily' }, { key: 'retention_days', label: 'Retensi backup', description: 'Jumlah hari backup disimpan.', type: 'number', defaultValue: 30 }, { key: 'include_attachments', label: 'Sertakan lampiran', description: 'Sertakan metadata lampiran dalam backup.', type: 'boolean', defaultValue: true }]} /></div></SettingsLayout>;
}

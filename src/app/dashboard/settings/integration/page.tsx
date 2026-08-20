import { SettingsLayout } from '@/components/domain/settings/settings-layout';
import { CategorySettingsForm } from '@/components/domain/settings/category-settings-form';

export default function IntegrationSettingsPage() {
  return <SettingsLayout><div className="space-y-6"><div><h1 className="text-3xl font-bold">Integration Settings</h1><p className="text-muted-foreground">Konfigurasi integrasi eksternal</p></div><CategorySettingsForm category="INTEGRATION" fields={[{ key: 'whatsapp_provider', label: 'Provider WhatsApp', description: 'Nama provider WhatsApp yang digunakan oleh bisnis.', type: 'text', defaultValue: '' }, { key: 'email_provider', label: 'Provider email', description: 'Nama provider email untuk notifikasi.', type: 'text', defaultValue: '' }, { key: 'payment_provider', label: 'Provider pembayaran', description: 'Nama provider gateway pembayaran yang aktif.', type: 'text', defaultValue: '' }, { key: 'webhook_enabled', label: 'Aktifkan webhook', description: 'Terima pembaruan status dari integrasi terhubung.', type: 'boolean', defaultValue: false }]} /></div></SettingsLayout>;
}

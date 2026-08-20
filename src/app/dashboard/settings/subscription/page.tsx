import { SettingsLayout } from '@/components/domain/settings/settings-layout';
import { CategorySettingsForm } from '@/components/domain/settings/category-settings-form';

export default function SubscriptionSettingsPage() {
  return <SettingsLayout><div className="space-y-6"><div><h1 className="text-3xl font-bold">Subscription Settings</h1><p className="text-muted-foreground">Konfigurasi langganan pelanggan</p></div><CategorySettingsForm category="SUBSCRIPTION" fields={[{ key: 'enabled', label: 'Aktifkan langganan', description: 'Tawarkan paket langganan untuk pelanggan.', type: 'boolean', defaultValue: true }, { key: 'auto_renewal', label: 'Perpanjangan otomatis', description: 'Perpanjang langganan aktif sesuai aturan paket.', type: 'boolean', defaultValue: false }, { key: 'grace_period_days', label: 'Masa tenggang', description: 'Hari tambahan setelah langganan berakhir.', type: 'number', defaultValue: 7 }]} /></div></SettingsLayout>;
}

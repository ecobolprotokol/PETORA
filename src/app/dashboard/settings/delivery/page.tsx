import { SettingsLayout } from '@/components/domain/settings/settings-layout';
import { CategorySettingsForm } from '@/components/domain/settings/category-settings-form';

export default function DeliverySettingsPage() {
  return <SettingsLayout><div className="space-y-6"><div><h1 className="text-3xl font-bold">Delivery Settings</h1><p className="text-muted-foreground">Konfigurasi pengiriman</p></div><CategorySettingsForm category="DELIVERY" fields={[{ key: 'enabled', label: 'Aktifkan delivery', description: 'Tawarkan pengiriman untuk pesanan pelanggan.', type: 'boolean', defaultValue: false }, { key: 'default_zone', label: 'Zona default', description: 'Zona pengiriman yang dipilih untuk pesanan baru.', type: 'text', defaultValue: '' }, { key: 'free_delivery_minimum', label: 'Minimum gratis ongkir', description: 'Nilai pesanan minimum untuk gratis ongkir.', type: 'number', defaultValue: 0 }, { key: 'proof_required', label: 'Wajib bukti pengiriman', description: 'Kurir harus mengunggah bukti penyelesaian.', type: 'boolean', defaultValue: true }]} /></div></SettingsLayout>;
}

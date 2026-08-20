import { SettingsLayout } from '@/components/domain/settings/settings-layout';
import { CategorySettingsForm } from '@/components/domain/settings/category-settings-form';

export default function CustomFieldsSettingsPage() {
  return <SettingsLayout><div className="space-y-6"><div><h1 className="text-3xl font-bold">Custom Fields</h1><p className="text-muted-foreground">Kelola konfigurasi field kustom</p></div><CategorySettingsForm category="CUSTOM_FIELD" fields={[{ key: 'customer_fields', label: 'Field customer', description: 'Daftar nama field tambahan untuk customer, dipisahkan koma.', type: 'text', defaultValue: '' }, { key: 'pet_fields', label: 'Field hewan', description: 'Daftar nama field tambahan untuk hewan, dipisahkan koma.', type: 'text', defaultValue: '' }, { key: 'required_customer_fields', label: 'Field customer wajib', description: 'Field customer tambahan yang wajib diisi.', type: 'text', defaultValue: '' }, { key: 'required_pet_fields', label: 'Field hewan wajib', description: 'Field hewan tambahan yang wajib diisi.', type: 'text', defaultValue: '' }]} /></div></SettingsLayout>;
}

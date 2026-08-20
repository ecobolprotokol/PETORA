'use client';

import { useState } from 'react';
import { updateSettingsBatchAction } from '@/app/actions/settings.actions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export interface CategorySettingField {
  key: string;
  label: string;
  description: string;
  type: 'text' | 'number' | 'boolean';
  defaultValue: string | number | boolean;
}

interface CategorySettingsFormProps {
  category: string;
  fields: CategorySettingField[];
}

export function CategorySettingsForm({ category, fields }: CategorySettingsFormProps): React.ReactElement {
  const [values, setValues] = useState<Record<string, string | number | boolean>>(
    () => Object.fromEntries(fields.map((field) => [field.key, field.defaultValue])),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateValue(key: string, value: string | number | boolean): void {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSubmitting(true);
    const result = await updateSettingsBatchAction({
      updates: fields.map((field) => ({
        category,
        key: field.key,
        value: values[field.key],
      })),
    });
    setIsSubmitting(false);

    if (result.success) {
      toast.success('Pengaturan berhasil disimpan');
    } else {
      toast.error(result.message ?? 'Pengaturan gagal disimpan');
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => {
          const value = values[field.key];
          return (
            <div key={field.key} className="flex items-start justify-between gap-6 border-b border-border pb-5 last:border-0 last:pb-0">
              <div className="space-y-1">
                <Label htmlFor={`${category}-${field.key}`}>{field.label}</Label>
                <p className="text-sm text-muted-foreground">{field.description}</p>
              </div>
              {field.type === 'boolean' ? (
                <Switch
                  id={`${category}-${field.key}`}
                  checked={value === true}
                  onCheckedChange={(checked) => updateValue(field.key, checked)}
                />
              ) : (
                <Input
                  id={`${category}-${field.key}`}
                  type={field.type}
                  value={String(value)}
                  onChange={(event) => updateValue(field.key, field.type === 'number' ? Number(event.target.value) : event.target.value)}
                  className="max-w-xs"
                />
              )}
            </div>
          );
        })}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Menyimpan...' : 'Simpan pengaturan'}</Button>
        </div>
      </form>
    </Card>
  );
}

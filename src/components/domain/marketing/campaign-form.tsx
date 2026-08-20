'use client';

import { useState } from 'react';
import { createCampaignAction } from '@/app/actions/marketing.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface CampaignFormProps { onSuccess?: () => void }

export function CampaignForm({ onSuccess }: CampaignFormProps): React.ReactElement {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('EMAIL');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSubmitting(true);
    const result = await createCampaignAction({ name, type, subject, content });
    setIsSubmitting(false);
    if (result.success) {
      toast.success('Campaign berhasil dibuat');
      onSuccess?.();
    } else {
      toast.error(result.message ?? 'Campaign gagal dibuat');
    }
  }

  return <Card className="p-6"><form onSubmit={handleSubmit} className="space-y-5">
    <div className="space-y-2"><Label htmlFor="campaign-name">Nama campaign</Label><Input id="campaign-name" required value={name} onChange={(event) => setName(event.target.value)} /></div>
    <div className="space-y-2"><Label htmlFor="campaign-type">Kanal</Label><select id="campaign-type" value={type} onChange={(event) => setType(event.target.value)} className="flex h-8 w-full rounded-lg border border-input bg-background px-2 text-sm"><option value="EMAIL">Email</option><option value="SMS">SMS</option><option value="WHATSAPP">WhatsApp</option><option value="PUSH">Push notification</option><option value="BROADCAST">Broadcast</option></select></div>
    <div className="space-y-2"><Label htmlFor="campaign-subject">Subjek</Label><Input id="campaign-subject" value={subject} onChange={(event) => setSubject(event.target.value)} /></div>
    <div className="space-y-2"><Label htmlFor="campaign-content">Isi pesan</Label><Textarea id="campaign-content" required value={content} onChange={(event) => setContent(event.target.value)} rows={7} /></div>
    <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={onSuccess}>Batal</Button><Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Menyimpan...' : 'Buat campaign'}</Button></div>
  </form></Card>;
}

'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseClient } from '@/lib/supabase/server';
import { createCampaignSchema } from '@/schemas/marketing';
import type { ActionResponse } from '@/types/base';
import type { Campaign } from '@/types/marketing';

export async function createCampaignAction(input: unknown): Promise<ActionResponse<Campaign>> {
  const parsed = createCampaignSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: 'VALIDATION_ERROR', details: parsed.error.flatten() };

  const supabase = await createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'AUTH_ERROR' };

  const { data, error } = await supabase.from('marketing_campaigns').insert({
    ...parsed.data,
    status: 'DRAFT',
    created_by: user.id,
  }).select('*').single();
  if (error) return { success: false, error: 'DB_ERROR', message: error.message };

  revalidatePath('/dashboard/marketing');
  return { success: true, data: data as Campaign };
}

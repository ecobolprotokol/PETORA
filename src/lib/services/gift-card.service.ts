import { createSupabaseClient } from '@/lib/supabase/server';
import type { GiftCard } from '@/types/promotion';

export class GiftCardService {
  static async listGiftCards(limit = 100): Promise<{ data: GiftCard[]; error: Error | null }> {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from('gift_cards')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    return {
      data: (data ?? []) as GiftCard[],
      error: error ? new Error(error.message) : null,
    };
  }
}

import { createSupabaseClient } from '@/lib/supabase/server';
import type { Kiosk } from '@/types/kiosk';

export class KioskService {
  static async listKiosks(): Promise<Kiosk[]> {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.from('kiosks').select('*').order('device_name', { ascending: true });
    if (error) {
      if (error.code === 'PGRST205') return [];
      throw error;
    }
    return (data ?? []) as Kiosk[];
  }
}

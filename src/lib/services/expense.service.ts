import { createSupabaseClient } from '@/lib/supabase/server';
import type { PaginatedResponse } from '@/types';
import type { ExpenseCategory } from '@/types/expense';

export class ExpenseService {
  static async listCategories(): Promise<ExpenseCategory[]> {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.from('expense_categories').select('*').order('name', { ascending: true });
    if (error) throw error;
    return (data ?? []) as ExpenseCategory[];
  }

  static async listExpenses(params: { page?: number; limit?: number; status?: string; branch_id?: string }) {
    const supabase = await createSupabaseClient();
    const { page = 1, limit = 20, status, branch_id } = params;
    let query = supabase.from('expenses').select('*, expense_categories(*)', { count: 'exact' }).order('expense_date', { ascending: false }).range((page - 1) * limit, page * limit - 1);
    if (status) query = query.eq('status', status);
    if (branch_id) query = query.eq('branch_id', branch_id);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data, total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) } as PaginatedResponse<Record<string, unknown>>;
  }
}

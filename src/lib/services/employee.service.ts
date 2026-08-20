import { createSupabaseClient } from '@/lib/supabase/server';
import type { PaginatedResponse } from '@/types';
import type { CommissionRule, PerformanceMetric } from '@/types/employee';

export class EmployeeService {
  static async listCommissionRules(): Promise<CommissionRule[]> {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.from('commission_rules').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []) as CommissionRule[];
  }

  static async listPerformanceMetrics(): Promise<PerformanceMetric[]> {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase.from('performance_metrics').select('*').order('period_end', { ascending: false });
    if (error) throw error;
    return (data ?? []) as PerformanceMetric[];
  }

  static async listEmployees(params: { page?: number; limit?: number; role?: string }) {
    const supabase = await createSupabaseClient();
    const { page = 1, limit = 20, role } = params;
    let query = supabase.from('users').select('*', { count: 'exact' }).order('full_name', { ascending: true }).range((page - 1) * limit, page * limit - 1);
    if (role) query = query.eq('role', role);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data, total: count ?? 0, page, limit, totalPages: Math.ceil((count ?? 0) / limit) } as PaginatedResponse<Record<string, unknown>>;
  }
}

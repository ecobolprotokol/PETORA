import { createSupabaseClient } from '@/lib/supabase/server';
import type { Product, PaginatedResponse } from '@/types';

export class ProductService {
  static async list(params: {
    page?: number;
    limit?: number;
    search?: string;
    category_id?: string;
    status?: string;
    low_stock?: boolean;
    expiring_soon?: boolean;
    branch_id?: string;
  }): Promise<PaginatedResponse<Product>> {
    const supabase = await createSupabaseClient();
    const { page = 1, limit = 20, search, category_id, status = 'ACTIVE', low_stock, expiring_soon, branch_id } = params;

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('is_active', status === 'ACTIVE')
      .order('name', { ascending: true })
      .range((page - 1) * limit, page * limit - 1);

    if (branch_id) query = query.eq('branch_id', branch_id);
    if (search) {
      const normalizedSearch = search.replace(/[%,()]/g, (character) => `\\${character}`);
      query = query.or(`name.ilike.%${normalizedSearch}%,sku.ilike.%${normalizedSearch}%`);
    }
    if (expiring_soon) {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      query = query.lte('expiry_date', thirtyDaysFromNow.toISOString()).not('expiry_date', 'is', null);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    let result = data as Product[];
    if (low_stock) {
      result = result.filter((product) => product.stock_quantity <= product.reorder_point);
    }

    return {
      data: result,
      total: count ?? 0,
      page,
      limit,
      totalPages: Math.ceil((count ?? 0) / limit),
    };
  }

  static async getLowStock(branch_id?: string): Promise<Product[]> {
    const supabase = await createSupabaseClient();
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (branch_id) query = query.eq('branch_id', branch_id);

    const { data, error } = await query;
    if (error) throw error;
    return ((data || []) as Product[]).filter(
      (product) => product.stock_quantity <= product.reorder_point
    );
  }

  static async getExpiringSoon(days: number = 30, branch_id?: string): Promise<Product[]> {
    const supabase = await createSupabaseClient();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);

    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (branch_id) query = query.eq('branch_id', branch_id);

    const { data, error } = await query;
    if (error) throw error;
    return data as Product[];
  }

  static async getById(id: string): Promise<Product | null> {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();
    if (error) return null;
    return data as Product;
  }

  static async getCategories(): Promise<{ id: string; name: string; photo_url: string | null }[]> {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, photo_url')
      .eq('is_active', true)
      .order('name');
    if (error) throw error;
    return (data || []) as { id: string; name: string; photo_url: string | null }[];
  }

  static async getSuppliers(): Promise<{ id: string; name: string }[]> {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from('suppliers')
      .select('id, name')
      .eq('is_active', true)
      .order('name');
    if (error) throw error;
    return (data || []) as { id: string; name: string }[];
  }
}

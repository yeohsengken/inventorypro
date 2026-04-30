import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../../core/services/supabase.service';
import { StockMovement } from '../../models/inventory.models';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private supabaseService = inject(SupabaseService);

  get client() {
    return this.supabaseService.client;
  }

  async getAll(productId?: number): Promise<StockMovement[]> {
    let query = this.client
      .from('stock_movements')
      .select('*')
      .order('created_at', { ascending: false });

    if (productId) {
      query = query.eq('product_id', productId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async addMovement(movement: {
    product_id: number;
    type: 'in' | 'out';
    quantity: number;
    notes?: string;
  }): Promise<void> {
    // First, update product quantity
    const { data: product } = await this.client
      .from('products')
      .select('quantity')
      .eq('id', movement.product_id)
      .single();

    if (!product) throw new Error('Product not found');

    const newQuantity =
      movement.type === 'in'
        ? product.quantity + movement.quantity
        : product.quantity - movement.quantity;

    if (newQuantity < 0) throw new Error('Not enough stock');

    // Update product quantity
    const { error: updateError } = await this.client
      .from('products')
      .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
      .eq('id', movement.product_id);

    if (updateError) throw updateError;

    // Record the movement
    const { error: insertError } = await this.client
      .from('stock_movements')
      .insert([movement]);

    if (insertError) throw insertError;
  }

  async getRecent(limit: number = 5): Promise<StockMovement[]> {
    const { data, error } = await this.client
      .from('stock_movements')
      .select('*, products(name)')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}

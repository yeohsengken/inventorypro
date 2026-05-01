import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Product } from '../models/inventory.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private supabaseService = inject(SupabaseService);

  get client() {
    return this.supabaseService.client;
  }

  async getAll(): Promise<Product[]> {
    const { data, error } = await this.client
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(id: number): Promise<Product | null> {
    const { data, error } = await this.client
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(product: Partial<Product>): Promise<Product> {
    const { data, error } = await this.client
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    const { data, error } = await this.client
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: number): Promise<void> {
    const { error } = await this.client.from('products').delete().eq('id', id);
    if (error) throw error;
  }

  async getLowStock(): Promise<Product[]> {
    const products = await this.getAll();
    return products
      .filter((product) => product.quantity <= product.low_stock_threshold)
      .sort((a, b) => a.quantity - b.quantity);
  }
}

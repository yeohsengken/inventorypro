export interface Product {
  id: number;
  user_id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  low_stock_threshold: number;
  category?: string;
  sku?: string;
  created_at: string;
  updated_at: string;
}

export interface StockMovement {
  id: number;
  user_id: string;
  product_id: number;
  type: 'in' | 'out';
  quantity: number;
  notes?: string;
  created_at: string;
}

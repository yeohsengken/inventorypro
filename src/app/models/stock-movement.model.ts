export class StockMovement {
  id: string = '';
  orgId: string = '';
  productId: string = '';
  type: 'in' | 'out' = 'in';
  quantity: number = 0;
  notes: string = '';
  createdAt: string = '';
}

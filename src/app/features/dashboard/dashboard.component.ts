import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../products/product.service';
import { StockService } from '../stock/stock.service';
import { Product, StockMovement } from '../../models/inventory.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private productService = inject(ProductService);
  private stockService = inject(StockService);

  totalProducts = 0;
  lowStockProducts: Product[] = [];
  recentMovements: (StockMovement & { product_name?: string })[] = [];
  loading = true;

  ngOnInit() {
    this.loadDashboard();
  }

  async loadDashboard() {
    try {
      const products = await this.productService.getAll();
      this.totalProducts = products.length;
      this.lowStockProducts = products.filter(p => p.quantity <= p.low_stock_threshold);
      this.recentMovements = await this.stockService.getRecent(5);
    } catch (err) {
      console.error('Dashboard load error', err);
    } finally {
      this.loading = false;
    }
  }

  getProductName(m: any): string {
    return m.products?.name || 'Unknown';
  }
}

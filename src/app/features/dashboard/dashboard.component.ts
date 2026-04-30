import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../core/services/supabase.service';
import { ProductService } from '../products/product.service';
import { StockService } from '../stock/stock.service';
import { Product, StockMovement } from '../../models/inventory.models';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, StatCardComponent, LoadingComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private supabaseService = inject(SupabaseService);
  private productService = inject(ProductService);
  private stockService = inject(StockService);
  private router = inject(Router);

  userEmail = signal('');
  totalProducts = signal(0);
  lowStockProducts = signal<Product[]>([]);
  recentMovements = signal<StockMovement[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.supabaseService.currentUser$.subscribe((user) => {
      this.userEmail.set(user?.email ?? '');
    });
    this.loadDashboard();
  }

  async loadDashboard() {
    try {
      const products = await this.productService.getAll();
      this.totalProducts.set(products.length);
      this.lowStockProducts.set(products.filter((p) => p.quantity <= p.low_stock_threshold));
      this.recentMovements.set(await this.stockService.getRecent(5));
    } catch {
      // ignore
    } finally {
      this.loading.set(false);
    }
  }

  async logout() {
    await this.supabaseService.signOut();
    this.router.navigate(['/login']);
  }

  getProductName(m: any): string {
    return m.products?.name || 'Unknown';
  }
}

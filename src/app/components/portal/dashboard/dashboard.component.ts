import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../helpers/supabase.service';
import { ProductService } from '../product/product.service';
import { StockService } from '../stock/stock.service';
import { Product } from '../../../models/product.model';
import { StockMovement } from '../../../models/stock-movement.model';
import { StatCardComponent } from '../../../theme/shared/stat-card/stat-card.component';
import { LoadingComponent } from '../../../theme/shared/loading/loading.component';

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
    this.router.navigate(['/auth/login']);
  }

  getProductName(m: any): string {
    return m.products?.name || 'Unknown';
  }
}

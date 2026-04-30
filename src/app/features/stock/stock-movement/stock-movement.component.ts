import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../stock.service';
import { ProductService } from '../../products/product.service';
import { StockMovement, Product } from '../../../models/inventory.models';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-stock-movement',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    PageHeaderComponent, LoadingComponent, EmptyStateComponent,
  ],
  templateUrl: './stock-movement.component.html',
})
export class StockMovementComponent implements OnInit {
  private stockService = inject(StockService);
  private productService = inject(ProductService);

  products: Product[] = [];
  movements: StockMovement[] = [];
  loading = signal(true);
  saving = signal(false);
  errorMessage = '';
  successMessage = '';

  selectedProductId: number | null = null;
  movementType: 'in' | 'out' = 'in';
  movementQuantity = 1;
  movementNotes = '';

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      this.products = await this.productService.getAll();
      this.movements = await this.stockService.getAll();
    } catch {
      // ignore
    } finally {
      this.loading.set(false);
    }
  }

  async recordMovement() {
    if (!this.selectedProductId) {
      this.errorMessage = 'Please select a product';
      return;
    }
    if (this.movementQuantity < 1) {
      this.errorMessage = 'Quantity must be at least 1';
      return;
    }

    this.saving.set(true);
    this.errorMessage = '';
    this.successMessage = '';

    try {
      await this.stockService.addMovement({
        product_id: this.selectedProductId,
        type: this.movementType,
        quantity: this.movementQuantity,
        notes: this.movementNotes || undefined,
      });

      this.successMessage = 'Stock movement recorded!';
      this.movementQuantity = 1;
      this.movementNotes = '';
      this.movements = await this.stockService.getAll();
      this.products = await this.productService.getAll();
    } catch (err: any) {
      this.errorMessage = err.message;
    } finally {
      this.saving.set(false);
    }
  }

  getProductName(id: number): string {
    return this.products.find((p) => p.id === id)?.name || 'Unknown';
  }
}

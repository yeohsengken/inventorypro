import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../stock.service';
import { ProductService } from '../../products/product.service';
import { StockMovement, Product } from '../../../models/inventory.models';

@Component({
  selector: 'app-stock-movement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-movement.component.html',
})
export class StockMovementComponent implements OnInit {
  private stockService = inject(StockService);
  private productService = inject(ProductService);

  products: Product[] = [];
  movements: (StockMovement & { product_name?: string })[] = [];
  loading = true;
  saving = false;
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
    } catch (err: any) {
      console.error('Failed to load', err);
    } finally {
      this.loading = false;
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

    this.saving = true;
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

      // Reload data
      this.movements = await this.stockService.getAll();
      this.products = await this.productService.getAll();
    } catch (err: any) {
      this.errorMessage = err.message;
    } finally {
      this.saving = false;
    }
  }

  getProductName(id: number): string {
    return this.products.find((p) => p.id === id)?.name || 'Unknown';
  }
}
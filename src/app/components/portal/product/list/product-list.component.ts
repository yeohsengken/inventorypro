import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../../shared/services/product.service';
import { Product } from '../../../../shared/models/inventory.models';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    PageHeaderComponent, LoadingComponent,
    EmptyStateComponent, ConfirmDialogComponent,
  ],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  products: Product[] = [];
  loading = signal(true);
  showDeleteDialog = signal(false);
  productToDelete: Product | null = null;

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    this.loading.set(true);
    try {
      this.products = await this.productService.getAll();
    } catch (err: any) {
      console.error('Failed to load products', err);
    } finally {
      this.loading.set(false);
    }
  }

  addProduct() {
    this.router.navigate(['/products/new']);
  }

  editProduct(id: number) {
    this.router.navigate(['/products', id, 'edit']);
  }

  confirmDelete(product: Product) {
    this.productToDelete = product;
    this.showDeleteDialog.set(true);
  }

  async deleteProduct() {
    if (!this.productToDelete) return;
    try {
      await this.productService.delete(this.productToDelete.id);
      this.showDeleteDialog.set(false);
      this.productToDelete = null;
      this.loadProducts();
    } catch (err: any) {
      console.error('Delete failed', err);
      this.showDeleteDialog.set(false);
    }
  }
}

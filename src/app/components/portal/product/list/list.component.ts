import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { PageHeaderComponent } from '../../../../theme/shared/page-header/page-header.component';
import { LoadingComponent } from '../../../../theme/shared/loading/loading.component';
import { EmptyStateComponent } from '../../../../theme/shared/empty-state/empty-state.component';
import { ConfirmDialogComponent } from '../../../../theme/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    PageHeaderComponent, LoadingComponent,
    EmptyStateComponent, ConfirmDialogComponent,
  ],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  products: any[] = [];
  loading = signal(true);
  showDeleteDialog = signal(false);
  productToDelete: any | null = null;

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
    this.router.navigate(['/product/detail']);
  }

  editProduct(id: number) {
    this.router.navigate(['/product/detail'], { queryParams: { id } });
  }

  confirmDelete(product: any) {
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

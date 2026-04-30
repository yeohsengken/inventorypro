import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../../../models/inventory.models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  products: Product[] = [];
  loading = true;

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      this.products = await this.productService.getAll();
    } catch (err: any) {
      console.error('Failed to load products', err);
    } finally {
      this.loading = false;
    }
  }

  addProduct() {
    this.router.navigate(['/products/new']);
  }

  editProduct(id: number) {
    this.router.navigate(['/products', id, 'edit']);
  }

  async deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await this.productService.delete(id);
        this.loadProducts();
      } catch (err: any) {
        alert('Failed to delete: ' + err.message);
      }
    }
  }
}
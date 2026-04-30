import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../../../models/inventory.models';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditing = false;
  productId: number | null = null;
  loading = false;
  saving = false;
  errorMessage = '';

  product: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    low_stock_threshold: 5,
    category: '',
    sku: '',
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.productId = Number(id);
      this.loadProduct();
    }
  }

  async loadProduct() {
    this.loading = true;
    try {
      const data = await this.productService.getById(this.productId!);
      if (data) {
        this.product = { ...data };
      }
    } catch (err: any) {
      this.errorMessage = 'Failed to load product';
    } finally {
      this.loading = false;
    }
  }

  async save() {
    this.saving = true;
    this.errorMessage = '';

    if (!this.product.name?.trim()) {
      this.errorMessage = 'Product name is required';
      this.saving = false;
      return;
    }

    try {
      if (this.isEditing && this.productId) {
        await this.productService.update(this.productId, this.product);
      } else {
        await this.productService.create(this.product);
      }
      this.router.navigate(['/products']);
    } catch (err: any) {
      this.errorMessage = err.message;
      this.saving = false;
    }
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
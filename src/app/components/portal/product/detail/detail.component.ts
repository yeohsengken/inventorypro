import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { PageHeaderComponent } from '../../../../theme/shared/page-header/page-header.component';
import { LoadingComponent } from '../../../../theme/shared/loading/loading.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    PageHeaderComponent, LoadingComponent,
  ],
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditing = signal(false);
  productId: number | null = null;
  loading = signal(false);
  saving = signal(false);
  errorMessage = '';

  product: Partial<any> = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    low_stock_threshold: 5,
    category: '',
    sku: '',
  };

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.productId = Number(id);
      this.loadProduct();
    }
  }

  async loadProduct() {
    this.loading.set(true);
    try {
      const data = await this.productService.getById(this.productId!);
      if (data) this.product = { ...data };
    } catch {
      this.errorMessage = 'Failed to load product';
    } finally {
      this.loading.set(false);
    }
  }

  async save() {
    this.saving.set(true);
    this.errorMessage = '';

    if (!this.product.name?.trim()) {
      this.errorMessage = 'Product name is required';
      this.saving.set(false);
      return;
    }

    try {
      if (this.isEditing() && this.productId) {
        await this.productService.update(this.productId, this.product);
      } else {
        await this.productService.create(this.product);
      }
      this.router.navigate(['/product/list']);
    } catch (err: any) {
      this.errorMessage = err.message;
      this.saving.set(false);
    }
  }

  cancel() {
    this.router.navigate(['/product/list']);
  }
}

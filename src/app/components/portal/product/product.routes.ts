import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/product-list.component').then((c) => c.ProductListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./detail/product-detail.component').then((c) => c.ProductDetailComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail/product-detail.component').then((c) => c.ProductDetailComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./detail/product-detail.component').then((c) => c.ProductDetailComponent),
  },
];

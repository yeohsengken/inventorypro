import { Routes } from '@angular/router';

export const stockRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/stock-list.component').then((c) => c.StockListComponent),
  },
];

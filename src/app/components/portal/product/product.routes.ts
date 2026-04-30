import { Routes } from '@angular/router';

export default [
  {
    path: 'list',
    loadComponent: () =>
      import('./list/list.component').then(m => m.ListComponent),
  },
  {
    path: 'detail',
    loadComponent: () =>
      import('./detail/detail.component').then(m => m.DetailComponent),
  },
] as Routes;

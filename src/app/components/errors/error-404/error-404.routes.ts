import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./error-404.component').then(m => m.Error404Component),
  },
] as Routes;

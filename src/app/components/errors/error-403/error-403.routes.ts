import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./error-403.component').then(m => m.Error403Component),
  },
] as Routes;

import { Routes } from '@angular/router';

export const sdsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/sds-list.component').then((c) => c.SdsListComponent),
  },
];

import { Routes } from '@angular/router';

export const reportRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/report-list.component').then((c) => c.ReportListComponent),
  },
];

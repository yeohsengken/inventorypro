import { Routes } from '@angular/router';

export const errorRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '404',
  },
  {
    path: '403',
    loadComponent: () =>
      import('./forbidden/forbidden.component').then((c) => c.ForbiddenComponent),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./not-found/not-found.component').then((c) => c.NotFoundComponent),
  },
];

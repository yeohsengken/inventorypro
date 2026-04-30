import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PortalLayoutComponent } from './layouts/portal-layout/portal-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./components/portal/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    component: PortalLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./components/portal/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./components/portal/product/product.routes').then((m) => m.productRoutes),
      },
      {
        path: 'stock',
        loadChildren: () =>
          import('./components/portal/stock/stock.routes').then((m) => m.stockRoutes),
      },
    ],
  },
  {
    path: '403',
    loadComponent: () =>
      import('./errors/forbidden/forbidden.component').then((c) => c.ForbiddenComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./errors/not-found/not-found.component').then((c) => c.NotFoundComponent),
  },
];

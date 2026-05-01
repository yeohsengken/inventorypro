import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { guestGuard } from './shared/guards/guest.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ErrorLayoutComponent } from './layouts/error-layout/error-layout.component';
import { PortalLayoutComponent } from './layouts/portal-layout/portal-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [guestGuard],
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
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
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
      {
        path: 'sds',
        loadChildren: () =>
          import('./components/portal/sds/sds.routes').then((m) => m.sdsRoutes),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./components/portal/reports/reports.routes').then((m) => m.reportRoutes),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./components/portal/settings/settings.routes').then((m) => m.settingsRoutes),
      },
    ],
  },
  {
    path: 'error',
    component: ErrorLayoutComponent,
    loadChildren: () =>
      import('./errors/error.routes').then((m) => m.errorRoutes),
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

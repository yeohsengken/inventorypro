import { Routes } from '@angular/router';

export const settingsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/settings-list.component').then((c) => c.SettingsListComponent),
  },
];

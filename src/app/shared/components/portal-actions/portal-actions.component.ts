import { Component } from '@angular/core';

@Component({
  selector: 'app-portal-actions',
  standalone: true,
  template: `
    <div class="mb-5 flex items-center justify-end gap-3">
      <ng-content />
    </div>
  `,
})
export class PortalActionsComponent {}

@Component({
  selector: 'app-portal-inline-actions',
  standalone: true,
  template: `
    <div class="inline-flex items-center justify-center gap-1">
      <ng-content />
    </div>
  `,
})
export class PortalInlineActionsComponent {}

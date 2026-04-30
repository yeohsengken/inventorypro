import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portal-page-content',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'block',
  },
  template: `
    <div
      class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
      [class.p-5]="padded()"
    >
      <ng-content />
    </div>
  `,
})
export class PortalPageContentComponent {
  padded = input(false);
}

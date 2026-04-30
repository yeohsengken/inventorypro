import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portal-page-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <ng-content />
    </div>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class PortalPageContentComponent {}

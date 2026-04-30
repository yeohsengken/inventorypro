import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <div
        class="mb-4 p-3 rounded-lg text-sm"
        [class.bg-red-50]="type() === 'error'"
        [class.border]="type() === 'error'"
        [class.border-red-200]="type() === 'error'"
        [class.text-red-700]="type() === 'error'"
        [class.bg-green-50]="type() === 'success'"
        [class.border]="type() === 'success'"
        [class.border-green-200]="type() === 'success'"
        [class.text-green-700]="type() === 'success'"
        [class.bg-blue-50]="type() === 'info'"
        [class.border]="type() === 'info'"
        [class.border-blue-200]="type() === 'info'"
        [class.text-blue-700]="type() === 'info'"
      >
        {{ message() }}
      </div>
    }
  `,
})
export class AlertComponent {
  visible = input(false);
  type = input<'error' | 'success' | 'info'>('error');
  message = input('');
}

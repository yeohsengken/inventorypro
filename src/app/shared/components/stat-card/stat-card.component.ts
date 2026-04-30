import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <p class="text-sm font-medium text-gray-500">{{ label() }}</p>
      <p class="text-3xl font-bold mt-1"
        [class.text-red-600]="accent() === 'danger'"
        [class.text-green-600]="accent() === 'success'"
        [class.text-gray-800]="accent() === 'default'"
      >{{ value() }}</p>
      @if (hint()) {
        <p class="text-xs mt-1" [class.text-red-500]="accent() === 'danger'"
                              [class.text-green-500]="accent() === 'success'"
                              [class.text-gray-400]="accent() === 'default'">{{ hint() }}</p>
      }
    </div>
  `,
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<string | number>();
  hint = input<string>('');
  accent = input<'default' | 'danger' | 'success'>('default');
}
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'block h-full',
  },
  template: `
    <div class="flex h-full min-h-36 flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p class="text-sm font-semibold text-slate-500">{{ label() }}</p>
      <p class="mt-4 text-3xl font-bold leading-none"
        [class.text-red-600]="accent() === 'danger'"
        [class.text-green-600]="accent() === 'success'"
        [class.text-slate-900]="accent() === 'default'"
      >{{ value() }}</p>
      @if (hint()) {
        <p class="mt-3 text-sm" [class.text-red-500]="accent() === 'danger'"
                              [class.text-green-500]="accent() === 'success'"
                              [class.text-slate-400]="accent() === 'default'">{{ hint() }}</p>
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

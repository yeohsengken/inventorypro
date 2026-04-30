import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-800">{{ title() }}</h2>
      @if (showButton()) {
        <button (click)="onAction.emit()"
          class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          {{ buttonLabel() }}
        </button>
      }
    </div>
  `,
})
export class PageHeaderComponent {
  title = input.required<string>();
  buttonLabel = input<string>('');
  showButton = input<boolean>(false);
  onAction = output<void>();
}
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <div class="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-800 mb-1">{{ title() }}</h3>
      <p class="text-sm text-gray-500 mb-6">{{ message() }}</p>
      @if (showButton()) {
        <button (click)="onAction.emit()"
          class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          {{ buttonLabel() }}
        </button>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  title = input<string>('Nothing here yet');
  message = input<string>('Get started by adding your first item.');
  buttonLabel = input<string>('Add');
  showButton = input<boolean>(false);
  onAction = output<void>();
}

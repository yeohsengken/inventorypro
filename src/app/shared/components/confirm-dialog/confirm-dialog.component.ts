import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/40" (click)="onCancel.emit()"></div>
        <div class="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ title() }}</h3>
          <p class="text-sm text-gray-600 mb-6">{{ message() }}</p>
          <div class="flex justify-end gap-3">
            <button (click)="onCancel.emit()"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button (click)="onConfirm.emit()"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
              {{ confirmLabel() }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmDialogComponent {
  visible = input<boolean>(false);
  title = input<string>('Confirm');
  message = input<string>('Are you sure?');
  confirmLabel = input<string>('Delete');
  onConfirm = output<void>();
  onCancel = output<void>();
}
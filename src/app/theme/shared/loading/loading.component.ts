import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center py-12">
      <div class="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p class="mt-3 text-sm text-gray-500">Loading...</p>
    </div>
  `,
})
export class LoadingComponent {}

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base',
  template: '',
  standalone: true,
  imports: [CommonModule],
})
export class AppBaseComponent {
  loading = signal(false);
  saving = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  handleError(error: any, defaultMessage = 'Something went wrong'): void {
    const message = error?.message || error?.error?.message || defaultMessage;
    this.errorMessage.set(message);
    console.error('Error:', error);
  }

  showSuccess(message: string): void {
    this.successMessage.set(message);
  }

  clearMessages(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
  }
}

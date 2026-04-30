import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppBaseHttpComponent } from './app-base-http.component';

@Component({
  selector: 'app-base-list',
  template: '',
  standalone: true,
  imports: [CommonModule],
})
export class AppBaseListComponent<T> extends AppBaseHttpComponent {
  protected router = inject(Router);

  items = signal<T[]>([]);
  selectedItem = signal<T | null>(null);
  totalItems = signal(0);
  pageSize = signal(10);
  currentPage = signal(1);

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  navigateToDetail(id: number | string): void {
    this.router.navigate([this.getBaseRoute(), id, 'edit']);
  }

  navigateToCreate(): void {
    this.router.navigate([this.getBaseRoute(), 'new']);
  }

  protected getBaseRoute(): string {
    return '';
  }
}

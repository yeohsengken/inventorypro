import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppBaseHttpComponent } from './app-base-http.component';

@Component({
  selector: 'app-base-detail',
  template: '',
  standalone: true,
  imports: [CommonModule],
})
export class AppBaseDetailComponent<T> extends AppBaseHttpComponent {
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);

  isEditing = signal(false);
  itemId = signal<number | string | null>(null);
  item = signal<T | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.itemId.set(id);
      this.loadItem();
    }
  }

  protected async loadItem(): Promise<void> {
    // Override in child class
  }

  protected getBaseRoute(): string {
    return '';
  }

  goBack(): void {
    this.router.navigate([this.getBaseRoute()]);
  }
}

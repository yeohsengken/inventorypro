import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';

type PortalButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'ghost-danger';
type PortalButtonSize = 'md' | 'icon';

@Component({
  selector: 'app-portal-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="resolvedButtonType()"
      [disabled]="disabled()"
      [ngClass]="buttonClass()"
      [attr.aria-label]="ariaLabel()"
      [attr.title]="title()"
      (click)="handleClick($event)"
    >
      @if (icon()) {
        <i [ngClass]="iconClass()"></i>
      }
      <ng-content />
    </button>
  `,
})
export class PortalButtonComponent {
  private router = inject(Router);

  variant = input<PortalButtonVariant>('secondary');
  size = input<PortalButtonSize>('md');
  icon = input('');
  link = input<string | unknown[] | null>(null);
  buttonType = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false);
  full = input(false);
  ariaLabel = input<string | null>(null);
  title = input<string | null>(null);
  buttonClick = output<MouseEvent>();

  resolvedButtonType = computed(() => (this.link() ? 'button' : this.buttonType()));

  buttonClass = computed(() => {
    const sizeClass =
      this.size() === 'icon'
        ? 'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors'
        : 'inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors';

    const variantClass: Record<PortalButtonVariant, string> = {
      primary: 'bg-blue-600 text-white shadow-sm hover:bg-blue-700 disabled:opacity-50',
      secondary: 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50',
      danger: 'border border-red-200 bg-white text-red-600 shadow-sm hover:bg-red-50 disabled:opacity-50',
      ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50',
      'ghost-danger': 'text-red-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50',
    };

    return [sizeClass, variantClass[this.variant()], this.full() ? 'w-full' : ''].filter(Boolean).join(' ');
  });

  iconClass = computed(() => ['pi', this.icon(), this.size() === 'icon' ? 'text-xs' : 'text-sm'].join(' '));

  handleClick(event: MouseEvent): void {
    const routeLink = this.link();

    if (!routeLink) {
      this.buttonClick.emit(event);
      return;
    }

    if (typeof routeLink === 'string') {
      this.router.navigateByUrl(routeLink);
      return;
    }

    this.router.navigate(routeLink as any[]);
  }
}

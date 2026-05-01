import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

export type PortalBadgeTone = 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'slate' | 'yellow';

@Component({
  selector: 'app-portal-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="badgeClass()">
      <ng-content />
    </span>
  `,
})
export class PortalBadgeComponent {
  tone = input<PortalBadgeTone>('slate');

  badgeClass = computed(() => {
    const toneClass: Record<PortalBadgeTone, string> = {
      blue: 'border-blue-200 bg-blue-50 text-blue-600',
      green: 'border-green-200 bg-green-50 text-green-700',
      orange: 'border-orange-200 bg-orange-50 text-orange-600',
      purple: 'border-purple-200 bg-purple-50 text-purple-600',
      red: 'border-red-200 bg-red-50 text-red-600',
      slate: 'border-slate-200 bg-slate-50 text-slate-600',
      yellow: 'border-yellow-200 bg-yellow-50 text-yellow-700',
    };

    return `inline-flex rounded-md border px-2.5 py-1 text-xs font-medium ${toneClass[this.tone()]}`;
  });
}

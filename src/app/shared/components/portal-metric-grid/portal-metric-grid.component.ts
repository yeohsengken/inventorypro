import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { PortalPageContentComponent } from '../portal-page-content/portal-page-content.component';

export type PortalMetricTone = 'blue' | 'green' | 'orange' | 'red';

export interface PortalMetricItem {
  label: string;
  value: string;
  hint: string;
  tone: PortalMetricTone;
  icon?: string;
}

@Component({
  selector: 'app-portal-metric-grid',
  standalone: true,
  imports: [CommonModule, PortalPageContentComponent],
  template: `
    <div class="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      @for (metric of metrics(); track metric.label) {
        <app-portal-page-content [padded]="true">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="truncate text-sm font-semibold text-slate-500">{{ metric.label }}</p>
              <p class="mt-3 text-3xl font-bold text-slate-900">{{ metric.value }}</p>
              <p class="mt-2 text-sm text-slate-500">{{ metric.hint }}</p>
            </div>

            <div class="flex h-10 w-10 flex-none items-center justify-center rounded-lg" [ngClass]="toneClass(metric.tone)">
              <i [ngClass]="['pi', metric.icon ?? 'pi-chart-bar', 'text-sm']"></i>
            </div>
          </div>
        </app-portal-page-content>
      }
    </div>
  `,
})
export class PortalMetricGridComponent {
  metrics = input<readonly PortalMetricItem[]>([]);

  toneClass(tone: PortalMetricTone): string {
    const classes: Record<PortalMetricTone, string> = {
      blue: 'bg-blue-50 text-blue-700',
      green: 'bg-green-50 text-green-700',
      orange: 'bg-orange-50 text-orange-700',
      red: 'bg-red-50 text-red-700',
    };

    return classes[tone];
  }
}

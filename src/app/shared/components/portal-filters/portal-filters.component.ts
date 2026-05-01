import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

type PortalFilterBarLayout = 'default' | 'chemical-list' | 'six' | 'five';

@Component({
  selector: 'app-portal-filter-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <div [ngClass]="gridClass()">
        <ng-content />
      </div>
    </div>
  `,
})
export class PortalFilterBarComponent {
  layout = input<PortalFilterBarLayout>('default');
  gridClass = computed(() => {
    const layouts: Record<PortalFilterBarLayout, string> = {
      default: 'grid grid-cols-1 gap-3',
      'chemical-list':
        'grid grid-cols-1 gap-3 xl:grid-cols-[minmax(260px,1.2fr)_minmax(140px,0.7fr)_minmax(160px,0.8fr)_minmax(135px,0.65fr)_minmax(125px,0.65fr)_92px]',
      six:
        'grid grid-cols-1 gap-3 xl:grid-cols-[minmax(260px,1.2fr)_minmax(145px,0.72fr)_minmax(140px,0.7fr)_minmax(140px,0.7fr)_minmax(135px,0.68fr)_92px]',
      five:
        'grid grid-cols-1 gap-3 xl:grid-cols-[minmax(300px,1.35fr)_minmax(150px,0.75fr)_minmax(140px,0.7fr)_minmax(140px,0.7fr)_92px]',
    };

    return layouts[this.layout()];
  });
}

@Component({
  selector: 'app-portal-search-filter',
  standalone: true,
  imports: [FormsModule],
  template: `
    <label class="relative block min-w-0">
      <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"></i>
      <input
        type="search"
        [ngModel]="value()"
        (ngModelChange)="valueChange.emit($event)"
        class="h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        [placeholder]="placeholder()"
      />
    </label>
  `,
})
export class PortalSearchFilterComponent {
  value = input('');
  placeholder = input('Search');
  valueChange = output<string>();
}

@Component({
  selector: 'app-portal-select-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <select
      [ngModel]="value()"
      (ngModelChange)="valueChange.emit($event)"
      class="h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
    >
      @for (option of options(); track option) {
        <option>{{ option }}</option>
      }
    </select>
  `,
})
export class PortalSelectFilterComponent {
  value = input('');
  options = input<string[]>([]);
  valueChange = output<string>();
}

@Component({
  selector: 'app-portal-date-filter',
  standalone: true,
  template: `
    <button
      type="button"
      class="inline-flex h-11 w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 transition-colors hover:bg-slate-50"
    >
      <span>{{ label() }}</span>
      <i class="pi pi-calendar text-sm text-slate-500"></i>
    </button>
  `,
})
export class PortalDateFilterComponent {
  label = input('Date Range');
}

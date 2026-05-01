import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portal-form-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <label class="block">
      <span class="text-sm font-medium text-slate-700">{{ label() }}</span>
      <input
        [type]="type()"
        [attr.min]="min()"
        [ngModel]="value()"
        (ngModelChange)="handleValueChange($event)"
        class="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  `,
})
export class PortalFormInputComponent {
  label = input('');
  type = input<'text' | 'number'>('text');
  min = input<number | null>(null);
  value = input<string | number>('');
  valueChange = output<any>();

  handleValueChange(value: string): void {
    this.valueChange.emit(this.type() === 'number' ? Number(value) : value);
  }
}

@Component({
  selector: 'app-portal-form-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <label class="block">
      <span class="text-sm font-medium text-slate-700">{{ label() }}</span>
      <select
        [ngModel]="value()"
        (ngModelChange)="valueChange.emit($event)"
        class="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      >
        @for (option of options(); track option) {
          <option>{{ option }}</option>
        }
      </select>
    </label>
  `,
})
export class PortalFormSelectComponent {
  label = input('');
  value = input('');
  options = input<string[]>([]);
  valueChange = output<string>();
}

@Component({
  selector: 'app-portal-form-textarea',
  standalone: true,
  imports: [FormsModule],
  template: `
    <label class="block">
      <span class="text-sm font-medium text-slate-700">{{ label() }}</span>
      <textarea
        [ngModel]="value()"
        (ngModelChange)="valueChange.emit($event)"
        [rows]="rows()"
        class="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      ></textarea>
    </label>
  `,
})
export class PortalFormTextareaComponent {
  label = input('');
  value = input('');
  rows = input(4);
  valueChange = output<string>();
}

@Component({
  selector: 'app-portal-toggle-row',
  standalone: true,
  imports: [FormsModule],
  template: `
    <label class="flex items-center justify-between gap-4 px-5 py-4">
      <span>
        <span class="block text-sm font-medium text-slate-800">{{ label() }}</span>
        <span class="mt-1 block text-xs text-slate-500">{{ hint() }}</span>
      </span>
      <input
        type="checkbox"
        [ngModel]="checked()"
        (ngModelChange)="checkedChange.emit($event)"
        class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
      />
    </label>
  `,
})
export class PortalToggleRowComponent {
  label = input('');
  hint = input('');
  checked = input(false);
  checkedChange = output<boolean>();
}

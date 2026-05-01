import { CommonModule } from '@angular/common';
import {
  Component,
  Directive,
  TemplateRef,
  computed,
  contentChild,
  inject,
  input,
  output,
  type WritableSignal,
} from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';

export interface PortalDataTablePageState {
  first: WritableSignal<number>;
  rows: WritableSignal<number>;
}

export interface PortalDataTableColumn {
  field?: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface PortalDataTableConfig {
  value?: unknown[];
  pageState?: PortalDataTablePageState;
  columns?: readonly PortalDataTableColumn[];
  rows?: number;
  first?: number;
  minWidth?: string;
  columnWidths?: readonly string[];
  totalRecords?: number;
  recordLabel?: string;
  emptyMessage?: string;
  emptyColspan?: number;
  rowsPerPageOptions?: readonly number[];
}

@Directive({
  selector: 'ng-template[portalDataTableHeader]',
  standalone: true,
})
export class PortalDataTableHeaderDirective {
  templateRef = inject(TemplateRef<unknown>);
}

@Directive({
  selector: 'ng-template[portalDataTableBody]',
  standalone: true,
})
export class PortalDataTableBodyDirective {
  templateRef = inject(TemplateRef<unknown>);
}

@Component({
  selector: 'app-portal-data-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  template: `
    <div class="px-4 pb-4">
      <p-table
        [value]="tableValue()"
        [paginator]="true"
        [alwaysShowPaginator]="true"
        [rows]="tableRows()"
        [first]="tableFirst()"
        [rowsPerPageOptions]="tableRowsPerPageOptions()"
        [tableStyle]="tableStyle()"
        styleClass="portal-data-table"
        (onPage)="handlePage($event)"
      >
        <ng-template pTemplate="colgroup">
          @for (width of tableColumnWidths(); track $index) {
            <col [style.width]="width" />
          }
        </ng-template>

        <ng-template pTemplate="header">
          @if (tableColumns().length > 0) {
            <tr>
              @for (column of tableColumns(); track column.label) {
                @if (column.sortable && column.field) {
                  <th [pSortableColumn]="column.field" [ngClass]="headerClass(column)">
                    {{ column.label }} <p-sortIcon [field]="column.field" />
                  </th>
                } @else {
                  <th [ngClass]="headerClass(column)">{{ column.label }}</th>
                }
              }
            </tr>
          } @else {
            @if (headerTemplate(); as template) {
              <ng-container [ngTemplateOutlet]="template.templateRef" />
            }
          }
        </ng-template>

        <ng-template pTemplate="body" let-row>
          @if (bodyTemplate(); as template) {
            <ng-container
              [ngTemplateOutlet]="template.templateRef"
              [ngTemplateOutletContext]="{ $implicit: row }"
            />
          }
        </ng-template>

        <ng-template pTemplate="emptymessage">
          <tr>
            <td [attr.colspan]="tableEmptyColspan()" class="px-4 py-12 text-center text-sm text-slate-500">
              {{ tableEmptyMessage() }}
            </td>
          </tr>
        </ng-template>

        <ng-template pTemplate="paginatorleft">
          <span class="text-sm text-slate-600">
            Showing {{ pageFirst() }} to {{ pageLast() }} of {{ tableTotalRecords() }} {{ tableRecordLabel() }}
          </span>
        </ng-template>
      </p-table>
    </div>
  `,
})
export class PortalDataTableComponent {
  headerTemplate = contentChild(PortalDataTableHeaderDirective);
  bodyTemplate = contentChild(PortalDataTableBodyDirective);

  config = input<PortalDataTableConfig | null>(null);
  value = input<unknown[]>([]);
  rows = input(10);
  first = input(0);
  minWidth = input('1000px');
  columnWidths = input<readonly string[]>([]);
  totalRecords = input(0);
  recordLabel = input('records');
  emptyMessage = input('No records found.');
  emptyColspan = input(1);
  rowsPerPageOptions = input<number[]>([10, 25, 50]);
  pageChange = output<TablePageEvent>();

  tableValue = computed(() => this.config()?.value ?? this.value());
  tableColumns = computed(() => this.config()?.columns ?? []);
  tableRows = computed(() => this.config()?.rows ?? this.config()?.pageState?.rows() ?? this.rows());
  tableFirst = computed(() => this.config()?.first ?? this.config()?.pageState?.first() ?? this.first());
  tableColumnWidths = computed(() => this.config()?.columnWidths ?? this.columnWidths());
  tableTotalRecords = computed(() => this.config()?.totalRecords ?? this.totalRecords());
  tableRecordLabel = computed(() => this.config()?.recordLabel ?? this.recordLabel());
  tableEmptyMessage = computed(() => this.config()?.emptyMessage ?? this.emptyMessage());
  tableEmptyColspan = computed(() => this.config()?.emptyColspan ?? this.emptyColspan());
  tableRowsPerPageOptions = computed(() => [...(this.config()?.rowsPerPageOptions ?? this.rowsPerPageOptions())]);

  tableStyle = computed(() => ({
    'min-width': this.config()?.minWidth ?? this.minWidth(),
    'table-layout': 'fixed',
  }));

  handlePage(event: TablePageEvent): void {
    const pageState = this.config()?.pageState;

    pageState?.first.set(event.first);
    pageState?.rows.set(event.rows);
    this.pageChange.emit(event);
  }

  headerClass(column: PortalDataTableColumn): string {
    return column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : '';
  }

  pageFirst(): number {
    return this.tableValue().length === 0 ? 0 : this.tableFirst() + 1;
  }

  pageLast(): number {
    return Math.min(this.tableFirst() + this.tableRows(), this.tableValue().length);
  }
}

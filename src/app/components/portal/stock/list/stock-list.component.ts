import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortalActionsComponent, PortalInlineActionsComponent } from '../../../../shared/components/portal-actions/portal-actions.component';
import { PortalBadgeComponent, PortalBadgeTone } from '../../../../shared/components/portal-badge/portal-badge.component';
import {
  type PortalDataTableConfig,
  PortalDataTableBodyDirective,
  PortalDataTableComponent,
} from '../../../../shared/components/portal-data-table/portal-data-table.component';
import {
  PortalDateFilterComponent,
  PortalFilterBarComponent,
  PortalSearchFilterComponent,
  PortalSelectFilterComponent,
} from '../../../../shared/components/portal-filters/portal-filters.component';
import { PortalButtonComponent } from '../../../../shared/components/portal-button/portal-button.component';
import { PortalPageContentComponent } from '../../../../shared/components/portal-page-content/portal-page-content.component';
import { MovementType } from '../../../../shared/models/inventory.models';

interface StockMovementListItem {
  id: number;
  movementId: string;
  chemical: string;
  batchNo: string;
  movementType: MovementType;
  quantity: number;
  unit: 'L' | 'kg';
  location: string;
  handledBy: string;
  date: string;
  remarks: string;
}

const STOCK_MOVEMENTS: StockMovementListItem[] = [
  {
    id: 1,
    movementId: 'MV-2026-001',
    chemical: 'Acetone',
    batchNo: 'AC-240515',
    movementType: MovementType.StockIn,
    quantity: 50,
    unit: 'L',
    location: 'Flammable Cabinet A',
    handledBy: 'Admin',
    date: 'May 15, 2026 10:24 AM',
    remarks: 'Supplier delivery',
  },
  {
    id: 2,
    movementId: 'MV-2026-002',
    chemical: 'Hydrochloric Acid',
    batchNo: 'HCL-240514',
    movementType: MovementType.StockOut,
    quantity: 10,
    unit: 'L',
    location: 'Acid Cabinet B',
    handledBy: 'John Tan',
    date: 'May 15, 2026 09:15 AM',
    remarks: 'Lab usage',
  },
  {
    id: 3,
    movementId: 'MV-2026-003',
    chemical: 'Sodium Hydroxide',
    batchNo: 'NAOH-240510',
    movementType: MovementType.Transfer,
    quantity: 5,
    unit: 'kg',
    location: 'Alkali Storage -> Production Area',
    handledBy: 'Mei Ling',
    date: 'May 14, 2026 04:45 PM',
    remarks: 'Internal transfer',
  },
  {
    id: 4,
    movementId: 'MV-2026-004',
    chemical: 'Ethanol',
    batchNo: 'ETH-240509',
    movementType: MovementType.Disposal,
    quantity: 2,
    unit: 'L',
    location: 'Flammable Cabinet A',
    handledBy: 'Admin',
    date: 'May 14, 2026 11:30 AM',
    remarks: 'Expired batch',
  },
  {
    id: 5,
    movementId: 'MV-2026-005',
    chemical: 'Hydrogen Peroxide',
    batchNo: 'HP-240508',
    movementType: MovementType.Adjustment,
    quantity: 1,
    unit: 'L',
    location: 'Oxidizer Rack',
    handledBy: 'Daniel',
    date: 'May 13, 2026 02:10 PM',
    remarks: 'Physical count correction',
  },
  {
    id: 6,
    movementId: 'MV-2026-006',
    chemical: 'Isopropyl Alcohol',
    batchNo: 'IPA-240507',
    movementType: MovementType.StockOut,
    quantity: 8,
    unit: 'L',
    location: 'Warehouse 1',
    handledBy: 'Sarah',
    date: 'May 13, 2026 09:05 AM',
    remarks: 'Production use',
  },
];

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PortalActionsComponent,
    PortalInlineActionsComponent,
    PortalBadgeComponent,
    PortalDataTableComponent,
    PortalDataTableBodyDirective,
    PortalDateFilterComponent,
    PortalFilterBarComponent,
    PortalSearchFilterComponent,
    PortalSelectFilterComponent,
    PortalButtonComponent,
    PortalPageContentComponent,
  ],
  templateUrl: './stock-list.component.html',
})
export class StockListComponent {
  movements = STOCK_MOVEMENTS;
  searchTerm = signal('');
  selectedMovementType = signal('Movement Type');
  selectedChemical = signal('Chemical');
  selectedLocation = signal('Location');
  selectedDateRange = signal('Date Range');
  first = signal(0);
  rows = signal(10);
  readonly tablePageState = { first: this.first, rows: this.rows };
  totalMovements = 24;
  readonly tableColumnWidths = [
    '115px',
    '140px',
    '120px',
    '130px',
    '90px',
    '60px',
    '170px',
    '100px',
    '160px',
    '160px',
    '104px',
  ] as const;
  readonly tableColumns = [
    { field: 'movementId', label: 'Movement ID', sortable: true },
    { field: 'chemical', label: 'Chemical', sortable: true },
    { field: 'batchNo', label: 'Batch No.', sortable: true },
    { field: 'movementType', label: 'Movement Type', sortable: true },
    { field: 'quantity', label: 'Quantity', sortable: true },
    { label: 'Unit' },
    { field: 'location', label: 'Location', sortable: true },
    { field: 'handledBy', label: 'Handled By', sortable: true },
    { field: 'date', label: 'Date', sortable: true },
    { field: 'remarks', label: 'Remarks', sortable: true },
    { label: 'Actions', align: 'center' },
  ] as const;
  tableConfig = computed<PortalDataTableConfig>(() => ({
    value: this.filteredMovements(),
    pageState: this.tablePageState,
    columns: this.tableColumns,
    minWidth: '1384px',
    columnWidths: this.tableColumnWidths,
    totalRecords: this.totalMovements,
    recordLabel: 'movements',
    emptyMessage: 'No movements match the selected filters.',
    emptyColspan: 11,
  }));
  movementTypeOptions = ['Movement Type', ...Object.values(MovementType)];
  chemicalOptions = ['Chemical', 'Acetone', 'Hydrochloric Acid', 'Sodium Hydroxide', 'Ethanol', 'Hydrogen Peroxide', 'Isopropyl Alcohol'];
  locationOptions = ['Location', 'Flammable Cabinet A', 'Acid Cabinet B', 'Alkali Storage', 'Oxidizer Rack', 'Warehouse 1'];

  filteredMovements = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const movementType = this.selectedMovementType();
    const chemical = this.selectedChemical();
    const location = this.selectedLocation();

    return this.movements.filter((movement) => {
      const matchesSearch =
        !search ||
        movement.chemical.toLowerCase().includes(search) ||
        movement.batchNo.toLowerCase().includes(search) ||
        movement.movementId.toLowerCase().includes(search) ||
        movement.remarks.toLowerCase().includes(search);
      const matchesMovementType = movementType === 'Movement Type' || movement.movementType === movementType;
      const matchesChemical = chemical === 'Chemical' || movement.chemical === chemical;
      const matchesLocation = location === 'Location' || movement.location.includes(location);

      return matchesSearch && matchesMovementType && matchesChemical && matchesLocation;
    });
  });

  resetFilters(): void {
    this.searchTerm.set('');
    this.selectedMovementType.set('Movement Type');
    this.selectedChemical.set('Chemical');
    this.selectedLocation.set('Location');
    this.selectedDateRange.set('Date Range');
    this.first.set(0);
  }

  movementTypeTone(type: MovementType): PortalBadgeTone {
    const tones: Record<MovementType, PortalBadgeTone> = {
      [MovementType.StockIn]: 'green',
      [MovementType.StockOut]: 'blue',
      [MovementType.Transfer]: 'purple',
      [MovementType.Disposal]: 'red',
      [MovementType.Adjustment]: 'orange',
    };

    return tones[type];
  }
}

import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PortalActionsComponent, PortalInlineActionsComponent } from '../../../../shared/components/portal-actions/portal-actions.component';
import { PortalBadgeComponent, PortalBadgeTone } from '../../../../shared/components/portal-badge/portal-badge.component';
import {
  type PortalDataTableConfig,
  PortalDataTableBodyDirective,
  PortalDataTableComponent,
} from '../../../../shared/components/portal-data-table/portal-data-table.component';
import {
  PortalFilterBarComponent,
  PortalSearchFilterComponent,
  PortalSelectFilterComponent,
} from '../../../../shared/components/portal-filters/portal-filters.component';
import { PortalButtonComponent } from '../../../../shared/components/portal-button/portal-button.component';
import { PortalPageContentComponent } from '../../../../shared/components/portal-page-content/portal-page-content.component';
import { MOCK_CHEMICALS } from '../../../../shared/mocks/chemical.mock';
import { ExpiryStatus, HazardClass, SdsStatus } from '../../../../shared/models/inventory.models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PortalActionsComponent,
    PortalInlineActionsComponent,
    PortalBadgeComponent,
    PortalDataTableComponent,
    PortalDataTableBodyDirective,
    PortalFilterBarComponent,
    PortalSearchFilterComponent,
    PortalSelectFilterComponent,
    PortalButtonComponent,
    PortalPageContentComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  chemicals = MOCK_CHEMICALS;
  searchTerm = signal('');
  selectedHazardClass = signal('Hazard Class');
  selectedLocation = signal('Storage Location');
  selectedStockStatus = signal('Stock Status');
  selectedSdsStatus = signal('SDS Status');
  first = signal(0);
  rows = signal(10);
  readonly tablePageState = { first: this.first, rows: this.rows };
  totalChemicals = this.chemicals.length;
  readonly tableColumnWidths = [
    '230px',
    '120px',
    '110px',
    '130px',
    '160px',
    '70px',
    '60px',
    '120px',
    '110px',
    '150px',
    '104px',
  ] as const;
  readonly tableColumns = [
    { field: 'name', label: 'Chemical', sortable: true },
    { field: 'code', label: 'Chemical Code', sortable: true },
    { field: 'casNo', label: 'CAS No.', sortable: true },
    { field: 'hazardClass', label: 'Hazard Class', sortable: true },
    { field: 'location', label: 'Location', sortable: true },
    { field: 'stock', label: 'Stock', sortable: true },
    { label: 'Unit' },
    { field: 'expiryStatus', label: 'Expiry Status', sortable: true },
    { field: 'sdsStatus', label: 'SDS Status', sortable: true },
    { field: 'updatedAt', label: 'Last Updated', sortable: true },
    { label: 'Actions', align: 'center' },
  ] as const;
  tableConfig = computed<PortalDataTableConfig>(() => ({
    value: this.filteredChemicals(),
    pageState: this.tablePageState,
    columns: this.tableColumns,
    minWidth: '1404px',
    columnWidths: this.tableColumnWidths,
    totalRecords: this.totalChemicals,
    recordLabel: 'chemicals',
    emptyMessage: 'No chemicals match the selected filters.',
    emptyColspan: 11,
  }));
  hazardClassOptions = ['Hazard Class', ...Object.values(HazardClass)];
  locationOptions = [
    'Storage Location',
    'Flammable Cabinet A',
    'Flammable Cabinet B',
    'Acid Cabinet A',
    'Acid Cabinet B',
    'Alkali Storage',
    'Corrosive Cabinet C',
    'Oxidizer Rack',
    'Toxic Storage',
    'Warehouse 1',
  ];
  stockStatusOptions = ['Stock Status', 'In Stock', 'Low Stock', 'Out of Stock'];
  sdsStatusOptions = ['SDS Status', ...Object.values(SdsStatus)];

  filteredChemicals = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const hazardClass = this.selectedHazardClass();
    const location = this.selectedLocation();
    const stockStatus = this.selectedStockStatus();
    const sdsStatus = this.selectedSdsStatus();

    return this.chemicals.filter((chemical) => {
      const matchesSearch =
        !search ||
        chemical.name.toLowerCase().includes(search) ||
        chemical.code.toLowerCase().includes(search) ||
        chemical.casNo.toLowerCase().includes(search);
      const matchesHazardClass = hazardClass === 'Hazard Class' || chemical.hazardClass === hazardClass;
      const matchesLocation = location === 'Storage Location' || chemical.location === location;
      const matchesStock =
        stockStatus === 'Stock Status' ||
        (stockStatus === 'In Stock' && chemical.stock > 20) ||
        (stockStatus === 'Low Stock' && chemical.stock > 0 && chemical.stock <= 20) ||
        (stockStatus === 'Out of Stock' && chemical.stock === 0);
      const matchesSds = sdsStatus === 'SDS Status' || chemical.sdsStatus === sdsStatus;

      return matchesSearch && matchesHazardClass && matchesLocation && matchesStock && matchesSds;
    });
  });

  resetFilters() {
    this.searchTerm.set('');
    this.selectedHazardClass.set('Hazard Class');
    this.selectedLocation.set('Storage Location');
    this.selectedStockStatus.set('Stock Status');
    this.selectedSdsStatus.set('SDS Status');
    this.first.set(0);
  }

  stockClass(stock: number): string {
    if (stock > 20) return 'text-green-600';
    if (stock > 0) return 'text-orange-500';
    return 'text-red-600';
  }

  hazardClassTone(hazardClass: HazardClass): PortalBadgeTone {
    const tones: Record<HazardClass, PortalBadgeTone> = {
      [HazardClass.Flammable]: 'red',
      [HazardClass.Corrosive]: 'orange',
      [HazardClass.Oxidizer]: 'yellow',
    };

    return tones[hazardClass];
  }

  expiryStatusTone(status: ExpiryStatus): PortalBadgeTone {
    const tones: Record<ExpiryStatus, PortalBadgeTone> = {
      [ExpiryStatus.Valid]: 'green',
      [ExpiryStatus.NearExpiry]: 'orange',
      [ExpiryStatus.Expired]: 'red',
    };

    return tones[status];
  }

  sdsStatusTone(status: SdsStatus): PortalBadgeTone {
    return status === SdsStatus.Uploaded ? 'green' : 'red';
  }
}

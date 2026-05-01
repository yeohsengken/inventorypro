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
import { HazardClass, SdsDocumentStatus } from '../../../../shared/models/inventory.models';

interface SdsListItem {
  id: number;
  documentId: string;
  chemical: string;
  casNo: string;
  hazardClass: HazardClass;
  version: string;
  revisionDate: string;
  expiryDate: string;
  status: SdsDocumentStatus;
  uploadedBy: string;
  fileName: string;
  fileSize: string;
}

const SDS_DOCUMENTS: SdsListItem[] = [
  {
    id: 1,
    documentId: 'SDS-2026-001',
    chemical: 'Acetone',
    casNo: '67-64-1',
    hazardClass: HazardClass.Flammable,
    version: 'v3.2',
    revisionDate: 'Jan 08, 2026',
    expiryDate: 'Jan 08, 2029',
    status: SdsDocumentStatus.Current,
    uploadedBy: 'Admin',
    fileName: 'acetone-sds-v3.2.pdf',
    fileSize: '1.2 MB',
  },
  {
    id: 2,
    documentId: 'SDS-2026-002',
    chemical: 'Hydrochloric Acid',
    casNo: '7647-01-0',
    hazardClass: HazardClass.Corrosive,
    version: 'v2.8',
    revisionDate: 'Feb 14, 2026',
    expiryDate: 'Feb 14, 2029',
    status: SdsDocumentStatus.Current,
    uploadedBy: 'John Tan',
    fileName: 'hydrochloric-acid-sds.pdf',
    fileSize: '980 KB',
  },
  {
    id: 3,
    documentId: 'SDS-2026-003',
    chemical: 'Sodium Hydroxide',
    casNo: '1310-73-2',
    hazardClass: HazardClass.Corrosive,
    version: 'v1.9',
    revisionDate: 'Mar 02, 2024',
    expiryDate: 'Mar 02, 2027',
    status: SdsDocumentStatus.ReviewSoon,
    uploadedBy: 'Mei Ling',
    fileName: 'sodium-hydroxide-sds.pdf',
    fileSize: '1.5 MB',
  },
  {
    id: 4,
    documentId: 'SDS-2026-004',
    chemical: 'Ethanol',
    casNo: '64-17-5',
    hazardClass: HazardClass.Flammable,
    version: 'v4.0',
    revisionDate: 'Dec 20, 2022',
    expiryDate: 'Dec 20, 2025',
    status: SdsDocumentStatus.Expired,
    uploadedBy: 'Admin',
    fileName: 'ethanol-sds-v4.pdf',
    fileSize: '1.1 MB',
  },
  {
    id: 5,
    documentId: 'SDS-2026-005',
    chemical: 'Hydrogen Peroxide',
    casNo: '7722-84-1',
    hazardClass: HazardClass.Oxidizer,
    version: 'v2.1',
    revisionDate: 'Apr 18, 2026',
    expiryDate: 'Apr 18, 2029',
    status: SdsDocumentStatus.Current,
    uploadedBy: 'Daniel',
    fileName: 'hydrogen-peroxide-sds.pdf',
    fileSize: '870 KB',
  },
  {
    id: 6,
    documentId: 'SDS-2026-006',
    chemical: 'Isopropyl Alcohol',
    casNo: '67-63-0',
    hazardClass: HazardClass.Flammable,
    version: '-',
    revisionDate: '-',
    expiryDate: '-',
    status: SdsDocumentStatus.Missing,
    uploadedBy: '-',
    fileName: 'Not uploaded',
    fileSize: '-',
  },
];

@Component({
  selector: 'app-sds-list',
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
  templateUrl: './sds-list.component.html',
})
export class SdsListComponent {
  documents = SDS_DOCUMENTS;
  searchTerm = signal('');
  selectedHazardClass = signal('Hazard Class');
  selectedChemical = signal('Chemical');
  selectedStatus = signal('SDS Status');
  selectedDateRange = signal('Date Range');
  first = signal(0);
  rows = signal(10);
  readonly tablePageState = { first: this.first, rows: this.rows };
  totalDocuments = 24;
  readonly tableColumnWidths = [
    '120px',
    '150px',
    '110px',
    '130px',
    '75px',
    '120px',
    '120px',
    '120px',
    '110px',
    '185px',
    '104px',
  ] as const;
  readonly tableColumns = [
    { field: 'documentId', label: 'SDS ID', sortable: true },
    { field: 'chemical', label: 'Chemical', sortable: true },
    { field: 'casNo', label: 'CAS No.', sortable: true },
    { field: 'hazardClass', label: 'Hazard Class', sortable: true },
    { field: 'version', label: 'Version', sortable: true },
    { field: 'revisionDate', label: 'Revision Date', sortable: true },
    { field: 'expiryDate', label: 'Expiry Date', sortable: true },
    { field: 'status', label: 'Status', sortable: true },
    { field: 'uploadedBy', label: 'Uploaded By', sortable: true },
    { field: 'fileName', label: 'File', sortable: true },
    { label: 'Actions', align: 'center' },
  ] as const;
  tableConfig = computed<PortalDataTableConfig>(() => ({
    value: this.filteredDocuments(),
    pageState: this.tablePageState,
    columns: this.tableColumns,
    minWidth: '1348px',
    columnWidths: this.tableColumnWidths,
    totalRecords: this.totalDocuments,
    recordLabel: 'SDS documents',
    emptyMessage: 'No SDS documents match the selected filters.',
    emptyColspan: 11,
  }));
  hazardClassOptions = ['Hazard Class', ...Object.values(HazardClass)];
  chemicalOptions = ['Chemical', 'Acetone', 'Hydrochloric Acid', 'Sodium Hydroxide', 'Ethanol', 'Hydrogen Peroxide', 'Isopropyl Alcohol'];
  statusOptions = ['SDS Status', ...Object.values(SdsDocumentStatus)];

  filteredDocuments = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const hazardClass = this.selectedHazardClass();
    const chemical = this.selectedChemical();
    const status = this.selectedStatus();

    return this.documents.filter((document) => {
      const matchesSearch =
        !search ||
        document.documentId.toLowerCase().includes(search) ||
        document.chemical.toLowerCase().includes(search) ||
        document.casNo.toLowerCase().includes(search) ||
        document.fileName.toLowerCase().includes(search);
      const matchesHazardClass = hazardClass === 'Hazard Class' || document.hazardClass === hazardClass;
      const matchesChemical = chemical === 'Chemical' || document.chemical === chemical;
      const matchesStatus = status === 'SDS Status' || document.status === status;

      return matchesSearch && matchesHazardClass && matchesChemical && matchesStatus;
    });
  });

  resetFilters(): void {
    this.searchTerm.set('');
    this.selectedHazardClass.set('Hazard Class');
    this.selectedChemical.set('Chemical');
    this.selectedStatus.set('SDS Status');
    this.selectedDateRange.set('Date Range');
    this.first.set(0);
  }

  hazardClassTone(hazardClass: HazardClass): PortalBadgeTone {
    const tones: Record<HazardClass, PortalBadgeTone> = {
      [HazardClass.Flammable]: 'red',
      [HazardClass.Corrosive]: 'orange',
      [HazardClass.Oxidizer]: 'yellow',
    };

    return tones[hazardClass];
  }

  statusTone(status: SdsDocumentStatus): PortalBadgeTone {
    const tones: Record<SdsDocumentStatus, PortalBadgeTone> = {
      [SdsDocumentStatus.Current]: 'green',
      [SdsDocumentStatus.ReviewSoon]: 'orange',
      [SdsDocumentStatus.Expired]: 'red',
      [SdsDocumentStatus.Missing]: 'slate',
    };

    return tones[status];
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PortalBadgeComponent, PortalBadgeTone } from '../../../../shared/components/portal-badge/portal-badge.component';
import { PortalButtonComponent } from '../../../../shared/components/portal-button/portal-button.component';
import {
  PortalFormInputComponent,
  PortalFormSelectComponent,
  PortalFormTextareaComponent,
} from '../../../../shared/components/portal-form-controls/portal-form-controls.component';
import { PortalPageContentComponent } from '../../../../shared/components/portal-page-content/portal-page-content.component';
import {
  getMockChemicalDetail,
  MockChemicalDetail,
  MockChemicalMovement,
  MOCK_CHEMICALS,
} from '../../../../shared/mocks/chemical.mock';
import { ExpiryStatus, HazardClass, MovementType, SdsStatus } from '../../../../shared/models/inventory.models';

type DetailMode = 'view' | 'new' | 'edit';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PortalBadgeComponent,
    PortalButtonComponent,
    PortalFormInputComponent,
    PortalFormSelectComponent,
    PortalFormTextareaComponent,
    PortalPageContentComponent,
  ],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  mode = signal<DetailMode>('view');
  chemicalId = signal(1);
  form = signal<MockChemicalDetail>(getMockChemicalDetail(1));
  hazardClassOptions = Object.values(HazardClass);
  unitOptions = ['L', 'kg'];

  chemical = computed(() => {
    return getMockChemicalDetail(this.chemicalId());
  });

  ngOnInit(): void {
    const url = this.route.snapshot.url.map((segment) => segment.path);
    const id = Number(this.route.snapshot.paramMap.get('id')) || 1;

    this.mode.set(url.includes('new') ? 'new' : url.includes('edit') ? 'edit' : 'view');
    this.chemicalId.set(id);
    this.form.set(this.mode() === 'new' ? this.createEmptyChemical() : { ...this.chemical() });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  savePreview(): void {
    this.router.navigate(['/products', this.chemicalId()]);
  }

  updateForm<K extends keyof MockChemicalDetail>(key: K, value: MockChemicalDetail[K]): void {
    this.form.update((current) => ({ ...current, [key]: value }));
  }

  updateHazardClass(value: string): void {
    this.updateForm('hazardClass', value as HazardClass);
  }

  updateUnit(value: string): void {
    this.updateForm('unit', value as MockChemicalDetail['unit']);
  }

  updateStock(value: number | string): void {
    this.updateForm('stock', Number(value) || 0);
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

  stockClass(stock: number): string {
    if (stock > 20) return 'text-green-600';
    if (stock > 0) return 'text-orange-500';
    return 'text-red-600';
  }

  movementTone(type: MockChemicalMovement['type']): PortalBadgeTone {
    const tones: Record<MockChemicalMovement['type'], PortalBadgeTone> = {
      [MovementType.StockIn]: 'green',
      [MovementType.StockOut]: 'blue',
      [MovementType.Transfer]: 'purple',
      [MovementType.Disposal]: 'red',
      [MovementType.Adjustment]: 'orange',
    };

    return tones[type];
  }

  private createEmptyChemical(): MockChemicalDetail {
    return {
      ...getMockChemicalDetail(1),
      id: MOCK_CHEMICALS.length + 1,
      name: '',
      code: '',
      casNo: '',
      formula: '',
      molecularWeight: '',
      stock: 0,
      minimumStock: 20,
      batchNo: '',
      supplier: '',
      manufacturer: '',
      description: '',
      avatar: 'NC',
      avatarClass: 'bg-slate-100 text-slate-700',
      movements: [],
    };
  }
}

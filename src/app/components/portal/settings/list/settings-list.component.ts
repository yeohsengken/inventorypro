import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortalBadgeComponent, PortalBadgeTone } from '../../../../shared/components/portal-badge/portal-badge.component';
import { PortalButtonComponent } from '../../../../shared/components/portal-button/portal-button.component';
import {
  PortalFormInputComponent,
  PortalFormSelectComponent,
  PortalToggleRowComponent,
} from '../../../../shared/components/portal-form-controls/portal-form-controls.component';
import { PortalPageContentComponent } from '../../../../shared/components/portal-page-content/portal-page-content.component';

interface AccessUser {
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Pending';
}

const ACCESS_USERS: AccessUser[] = [
  {
    name: 'Admin User',
    email: 'admin@chemtrack.local',
    role: 'Administrator',
    status: 'Active',
  },
  {
    name: 'John Tan',
    email: 'john.tan@chemtrack.local',
    role: 'Lab Manager',
    status: 'Active',
  },
  {
    name: 'Mei Ling',
    email: 'mei.ling@chemtrack.local',
    role: 'Safety Officer',
    status: 'Active',
  },
  {
    name: 'Sarah Lee',
    email: 'sarah.lee@chemtrack.local',
    role: 'Inventory Staff',
    status: 'Pending',
  },
];

@Component({
  selector: 'app-settings-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PortalBadgeComponent,
    PortalButtonComponent,
    PortalFormInputComponent,
    PortalFormSelectComponent,
    PortalToggleRowComponent,
    PortalPageContentComponent,
  ],
  templateUrl: './settings-list.component.html',
})
export class SettingsListComponent {
  organizationName = signal('ChemTrack Laboratory');
  facilityCode = signal('LAB-MY-001');
  defaultLocation = signal('Flammable Cabinet A');
  timezone = signal('Asia/Kuala_Lumpur');
  lowStockThreshold = signal(20);
  expiryWarningDays = signal(30);
  sdsReviewMonths = signal(12);
  emailAlerts = signal(true);
  lowStockAlerts = signal(true);
  expiryAlerts = signal(true);
  weeklySummary = signal(false);
  users = ACCESS_USERS;
  locationOptions = ['Flammable Cabinet A', 'Acid Cabinet B', 'Alkali Storage', 'Warehouse 1'];
  timezoneOptions = ['Asia/Kuala_Lumpur', 'Asia/Singapore', 'UTC'];

  statusTone(status: AccessUser['status']): PortalBadgeTone {
    return status === 'Active' ? 'green' : 'orange';
  }
}

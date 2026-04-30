import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../core/services/supabase.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
  userEmail = '';

  ngOnInit() {
    this.supabaseService.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.userEmail = user.email || '';
      }
    });
  }

  async logout() {
    await this.supabaseService.signOut();
    this.router.navigate(['/login']);
  }
}

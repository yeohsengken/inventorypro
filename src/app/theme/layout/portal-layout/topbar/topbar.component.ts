import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { SupabaseService } from '../../../../helpers/supabase.service';
import { filter, map } from 'rxjs/operators';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/product/list': 'Products',
  '/product/detail': 'Product Detail',
  '/stock/list': 'Stock Movement',
};

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent implements OnInit {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);

  userEmail = '';
  pageTitle = 'Dashboard';

  ngOnInit() {
    this.supabaseService.currentUser$.subscribe(user => {
      this.userEmail = user?.email ?? '';
    });

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects)
    ).subscribe(url => {
      const base = '/' + url.split('/').slice(1, 3).join('/');
      this.pageTitle = PAGE_TITLES[url] ?? PAGE_TITLES[base] ?? 'InventoryPro';
    });

    const base = '/' + this.router.url.split('/').slice(1, 3).join('/');
    this.pageTitle = PAGE_TITLES[this.router.url] ?? PAGE_TITLES[base] ?? 'InventoryPro';
  }

  async logout() {
    await this.supabaseService.signOut();
    this.router.navigate(['/auth/login']);
  }
}

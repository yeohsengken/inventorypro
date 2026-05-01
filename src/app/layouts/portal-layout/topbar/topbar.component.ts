import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { filter, map } from 'rxjs/operators';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/products': 'Chemicals',
  '/products/new': 'Add Chemical',
  '/stock': 'Stock Movement',
  '/sds': 'SDS Library',
  '/reports': 'Reports',
  '/settings': 'Settings',
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
  private destroyRef = inject(DestroyRef);

  userEmail = '';
  pageTitle = 'Dashboard';

  ngOnInit(): void {
    this.supabaseService.currentUser$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        this.userEmail = user?.email ?? '';
      });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => (event as NavigationEnd).urlAfterRedirects),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((url) => {
        this.pageTitle = this.getPageTitle(url);
      });

    this.pageTitle = this.getPageTitle(this.router.url);
  }

  async logout(): Promise<void> {
    await this.supabaseService.signOut();
    this.router.navigate(['/auth/login']);
  }

  private getPageTitle(url: string): string {
    if (/^\/products\/new/.test(url)) return 'Add Chemical';
    if (/^\/products\/\d+\/edit/.test(url)) return 'Edit Chemical';
    if (/^\/products\/\d+/.test(url)) return 'Chemical Details';

    const base = '/' + url.split('/')[1];
    return PAGE_TITLES[url] ?? PAGE_TITLES[base] ?? 'ChemTrack';
  }
}

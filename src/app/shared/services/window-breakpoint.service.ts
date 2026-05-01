import { isPlatformBrowser } from '@angular/common';
import { Injectable, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type WindowBreakpoint = 'mobile' | 'tablet' | 'desktop';

@Injectable({
  providedIn: 'root',
})
export class WindowBreakpointService implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private breakpointSubject = new BehaviorSubject<WindowBreakpoint | null>(null);

  breakpoint: Observable<WindowBreakpoint | null> = this.breakpointSubject.asObservable();

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      this.breakpointSubject.next('desktop');
      return;
    }

    this.updateBreakpoint();

    window.addEventListener('resize', this.updateBreakpoint, { passive: true });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.updateBreakpoint);
    }
  }

  private updateBreakpoint = (): void => {
    const width = window.innerWidth;

    if (width < 768) {
      this.breakpointSubject.next('mobile');
      return;
    }

    if (width < 1024) {
      this.breakpointSubject.next('tablet');
      return;
    }

    this.breakpointSubject.next('desktop');
  };
}

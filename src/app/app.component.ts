import { Component, DestroyRef, OnInit, Renderer2, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { debounceTime, filter, take } from 'rxjs';
import { RootPageSpinnerComponent } from './shared/components/root-page-spinner/root-page-spinner.component';
import { PageInfoService } from './shared/services/page-info.service';
import { WindowBreakpointService } from './shared/services/window-breakpoint.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, RootPageSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private renderer = inject(Renderer2);
  private destroyRef = inject(DestroyRef);
  private pageInfoService = inject(PageInfoService);
  private windowBreakpointService = inject(WindowBreakpointService);

  title = 'ChemTrack';
  isFullScreenSpinnerShow = signal(true);
  isPageReady = signal(false);

  ngOnInit(): void {
    this.renderer.setAttribute(document.documentElement, 'lang', 'en');

    this.pageInfoService.showFullScreenSpinner();

    this.pageInfoService.isFullScreenSpinnerShow
      .pipe(debounceTime(120), takeUntilDestroyed(this.destroyRef))
      .subscribe((show) => {
        this.isFullScreenSpinnerShow.set(show);
      });

    this.windowBreakpointService.breakpoint
      .pipe(
        filter((breakpoint) => breakpoint !== null),
        take(1),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.isPageReady.set(true);
        this.pageInfoService.hideFullScreenSpinner();
      });
  }
}

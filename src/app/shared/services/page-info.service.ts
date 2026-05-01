import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageInfoService {
  private fullScreenSpinnerVisible = new BehaviorSubject<boolean>(true);

  isFullScreenSpinnerShow: Observable<boolean> = this.fullScreenSpinnerVisible.asObservable();

  showFullScreenSpinner(): void {
    this.fullScreenSpinnerVisible.next(true);
  }

  hideFullScreenSpinner(): void {
    this.fullScreenSpinnerVisible.next(false);
  }

  setFullScreenSpinner(show: boolean): void {
    this.fullScreenSpinnerVisible.next(show);
  }
}

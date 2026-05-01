import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root-page-spinner',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  template: `
    <div [class.hidden]="!show" role="status" aria-live="polite">
      <ngx-spinner
        [name]="name"
        type="ball-fall"
        bdColor="rgba(15, 23, 42, 0.95)"
        color="#ffffff"
        size="medium"
        [zIndex]="99998"
        [fullScreen]="true"
      />
    </div>
  `,
})
export class RootPageSpinnerComponent {
  private spinner = inject(NgxSpinnerService);

  @Input() name = 'rootPageSpinner';

  @Input() set show(value: boolean) {
    this.showSpinner = value;
    this.updateSpinner();
  }

  get show(): boolean {
    return this.showSpinner;
  }

  private showSpinner = false;

  private updateSpinner(): void {
    if (this.showSpinner) {
      this.spinner.show(this.name);
    } else {
      this.spinner.hide(this.name);
    }
  }
}

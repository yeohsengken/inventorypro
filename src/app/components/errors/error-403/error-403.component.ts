import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-403',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error-403.component.html',
})
export class Error403Component {}

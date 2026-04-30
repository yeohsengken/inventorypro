import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SupabaseService } from '../../../../shared/services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  async login() {
    this.loading = true;
    this.errorMessage = '';

    const { error } = await this.supabaseService.signIn(
      this.email,
      this.password
    );

    if (error) {
      this.errorMessage = error.message;
      this.loading = false;
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}

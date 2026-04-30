import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SupabaseService } from '../../../helpers/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  async register() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.loading = false;
      return;
    }

    // Check password length
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      this.loading = false;
      return;
    }

    const { error } = await this.supabaseService.signUp(
      this.email,
      this.password
    );

    if (error) {
      this.errorMessage = error.message;
      this.loading = false;
    } else {
      this.successMessage = 'Account created! You can now sign in.';
      this.loading = false;
    }
  }
}

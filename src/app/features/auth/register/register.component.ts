import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SupabaseService } from '../../../core/services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
  email = '';
  password = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  async register() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

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

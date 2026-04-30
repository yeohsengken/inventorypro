import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { filter, switchMap, take, map } from 'rxjs/operators';

export const authGuard = () => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  return supabaseService.sessionReady$.pipe(
    filter(ready => ready),
    take(1),
    switchMap(() => supabaseService.currentUser$.pipe(take(1))),
    map(user => {
      if (user) return true;
      router.navigate(['/auth/login']);
      return false;
    })
  );
};

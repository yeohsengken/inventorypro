import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { SupabaseService } from '../services/supabase.service';

export const guestGuard = () => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  return supabaseService.sessionReady$.pipe(
    filter((ready) => ready),
    take(1),
    switchMap(() => supabaseService.currentUser$.pipe(take(1))),
    map((user) => {
      if (!user) return true;
      router.navigate(['/dashboard']);
      return false;
    }),
  );
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service/auth-service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated$.pipe(
    take(1),
    map((isAuth) => (isAuth ? true : router.createUrlTree(['/login']))),
  );
};

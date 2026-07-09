import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../../shared/services/jwt-service/jwt-service';

export const guestGuard: CanActivateFn = () => {
  const jwt = inject(JwtService);
  const router = inject(Router);
  return jwt.getToken() ? router.createUrlTree(['/']) : true;
};

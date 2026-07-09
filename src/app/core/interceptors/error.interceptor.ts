// src/app/core/interceptors/error.interceptor.ts
import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from '../../shared/services/jwt-service/jwt-service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private jwt = inject(JwtService);
  private router = inject(Router);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: unknown) => {
        // Only HTTP failures are normalized here — pass anything else through untouched.
        if (!(error instanceof HttpErrorResponse)) {
          return throwError(() => error);
        }

        // 401: the session is invalid — purge the token and bounce to login.
        // Skip: the login request itself (avoid a loop) and the bootstrap `GET /user`
        // call, which AuthService.hydrate() handles on its own (falls back to anonymous
        // without forcing a redirect). endsWith('/user') so it doesn't match /users or
        // /users/login.
        const isLoginRequest = request.url.includes('/login');
        const isCurrentUserRequest = request.url.endsWith('/user');
        if (error.status === 401 && !isLoginRequest && !isCurrentUserRequest) {
          this.jwt.removeToken();
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: this.router.url },
          });
        }

        // Re-emit a flat, display-ready message list so downstream subscribers still receive it.
        return throwError(() => this.normalize(error));
      }),
    );
  }

  private normalize(error: HttpErrorResponse): string[] {
    // Network / offline: no response ever reached the client.
    if (error.status === 0) {
      return ['Unable to reach the server. Check your connection.'];
    }

    // Server errors (5xx).
    if (error.status >= 500) {
      return ['Server error, try again later.'];
    }

    // RealWorld validation errors: { errors: { field: string[] } } -> ['field msg', ...]
    const errors = error.error?.errors ?? {};
    const flat = Object.entries(errors).flatMap(([field, msgs]) =>
      (msgs as string[]).map((m) => `${field} ${m}`),
    );

    return flat.length ? flat : [error.message || 'Something went wrong.'];
  }
}

// src/app/core/interceptors/jwt.interceptor.ts
import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../../shared/services/jwt-service/jwt-service';
import { API_BASE_URL } from '../../shared/api-token';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private jwt = inject(JwtService);
  private baseUrl = inject(API_BASE_URL);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.jwt.getToken();
    const isApiUrl = request.url.startsWith(this.baseUrl);

    if (token && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Token ${token}` },
      });
    }

    return next.handle(request);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_BASE_URL } from '../api-token';
import { Observable } from 'rxjs';

@Service()
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_BASE_URL);

  private toParams(params?: Record<string, string | number | boolean | undefined>): HttpParams {
    let httpParams = new HttpParams();
    if (!params) {
      return httpParams;
    }
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value);
      }
    }
    return httpParams;
  }

  get<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, { params: this.toParams(params) });
  }

  post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body);
  }

  put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body);
  }

  delete<T>(path: string, body?: unknown): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`, { body });
  }
}

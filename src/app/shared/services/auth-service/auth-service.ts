import { inject, Service } from '@angular/core';
import { BehaviorSubject, catchError, distinctUntilChanged, map, Observable, of, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { JwtService } from '../jwt-service/jwt-service';
import { ApiService } from '../api-service/api-service';

@Service()
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  // public read-only streams the rest of the app consumes
  readonly currentUser$ = this.currentUserSubject.asObservable();
  readonly isAuthenticated$ = this.currentUser$.pipe(
    map((user) => !!user),
    distinctUntilChanged(),
  );

  private api = inject(ApiService);
  private jwt = inject(JwtService);

  // called on startup (see step 4) and after login
  hydrate(): Observable<User | null> {
    if (!this.jwt.getToken()) {
      return of(null); // no token -> stay logged out
    }
    return this.api.get<{ user: User }>('/user').pipe(
      map((res) => res.user),
      tap((user) => this.currentUserSubject.next(user)), // push into the stream
      catchError(() => {
        this.purgeAuth(); // bad/expired token
        return of(null);
      }),
    );
  }

  setAuth(user: User): void {
    this.jwt.setToken(user.token);
    this.currentUserSubject.next(user); // header reacts immediately
  }

  logout(): void {
    this.purgeAuth();
  }

  private purgeAuth(): void {
    this.jwt.removeToken();
    this.currentUserSubject.next(null); // header reacts immediately
  }
}

import { Service } from '@angular/core';

const LOCAL_KEY = 'auth-token';

@Service()
export class JwtService {
  getToken() {
    return localStorage.getItem(LOCAL_KEY);
  }

  setToken(token: string) {
    localStorage.setItem(LOCAL_KEY, token);
  }

  removeToken() {
    localStorage.removeItem(LOCAL_KEY);
  }
}

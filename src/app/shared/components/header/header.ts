import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private auth = inject(AuthService);
  loggedIn = false; // TODO: replace when auth is implemented
  currentUser$ = this.auth.currentUser$;
}

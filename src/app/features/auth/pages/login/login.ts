import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth-service/auth-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form: FormGroup;
  errors = signal<string[]>([]);
  loading = signal(false);

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  isInvalid(formControlName: string) {
    const control = this.form.get(formControlName);
    return control?.invalid && (control.touched || control.dirty);
  }

  submit() {
    if (this.form.invalid || this.loading()) return;

    this.errors.set([]);
    const { email, password } = this.form.value;
    this.loading.set(true);
    this.auth.authenticate({ email, password }, '/users/login').subscribe({
      complete: () => {
        this.loading.set(false);
        this.router.navigateByUrl('/');
      },
      error: (errs) => {
        this.errors.set(errs);
        this.loading.set(false);
      },
    });
  }
}

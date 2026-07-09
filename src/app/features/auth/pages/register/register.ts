import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RealWorldApiService } from '../../../../shared/real-world-api-service/real-world-api-service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth-service/auth-service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  form: FormGroup;
  errors = signal<string[]>([]);
  loading = signal(false);

  constructor(
    private api: RealWorldApiService,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
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
    const values = this.form.value;
    this.loading.set(true);
    this.api.register(values.username, values.email, values.password).subscribe({
      next: (user) => {
        this.auth.setAuth(user);
      },
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

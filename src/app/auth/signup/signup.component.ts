import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  signupForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  isAccountCreated: boolean | undefined;
  serverError: string = '';

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.http
        .post<{ user: User }>('https://api.realworld.io/api/users', {
          user: this.signupForm.getRawValue(),
        })
        .subscribe(
          (response) => {
            console.log('Signup successful:', response);
            this.isAccountCreated = true;
            localStorage.setItem('token', response.user.token);
            this.authService.user.set(response.user);
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Signup failed:', error.message);
            this.isAccountCreated = false;
            this.serverError = error.message;
          },
        );
    }
  }
}

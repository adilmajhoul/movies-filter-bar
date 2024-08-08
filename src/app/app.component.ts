import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,

    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  http = inject(HttpClient);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.http
      .get<{
        user: User;
      }>('https://api.realworld.io/api/user')
      .subscribe(
        (response) => this.authService.user.set(response.user),
        (error) => {
          this.authService.user.set(null);
        },
      );
  }
}

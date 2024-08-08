import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../types/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  http = inject(HttpClient);
  authService = inject(AuthService);

  user: User | null | undefined = null;

  ngOnInit(): void {
    this.http
      .get<{ user: User }>('https://api.realworld.io/api/user')
      .subscribe((response) => {
        this.user = response.user;
      });
  }
}

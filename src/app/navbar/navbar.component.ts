import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ViewPortStateService } from '../services/view-port-state.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  viewPortStateService = inject(ViewPortStateService);

  ngOnInit() {
    this.viewPortStateService.viewPortState$.subscribe((viewPortState) => {
      console.log('Current screen size from NAVBAR:', viewPortState);
    });
  }

  logout(): void {
    localStorage.setItem('token', '');
    this.authService.user.set(null);
  }
}

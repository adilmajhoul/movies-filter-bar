import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { User } from './types/user';
import { Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ResponsiveService } from './services/responsive.service';
import { ViewPortStateService } from './services/view-port-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  http = inject(HttpClient);
  authService = inject(AuthService);

  destroyed = new Subject<void>();
  currentScreenSize: string = '';
  breakpointObserver = inject(BreakpointObserver);
  responsiveService = inject(ResponsiveService);
  viewPortStateService = inject(ViewPortStateService);

  breakpoints = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  ngOnInit(): void {
    console.log('auth state from APP:', this.authService.user());

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
    // ============================================
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.breakpoints.get(query) ?? 'Unknown';
            this.viewPortStateService.setViewPortState(this.currentScreenSize);
          }
        }

        console.log('Current screen size from APP:', this.currentScreenSize);
      });
  }
}

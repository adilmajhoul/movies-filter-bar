import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { ShowCardComponent } from './show-card/show-card.component';
import { PaginationBarComponent } from './pagination-bar/pagination-bar.component';
import { MoviesDataService } from './services/movies-data.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

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
  // title = 'movies-filter-bar';
  // movies: any;
  // constructor(private moviesDataService: MoviesDataService) {}
  // ngOnInit() {
  //   this.moviesDataService.moviesData$.subscribe((movies) => {
  //     this.movies = movies;
  //     console.log('movies from app component', this.movies);
  //   });
  // }
}

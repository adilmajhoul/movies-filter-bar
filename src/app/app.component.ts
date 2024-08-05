import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { ShowCardComponent } from './show-card/show-card.component';
import { PaginationBarComponent } from './pagination-bar/pagination-bar.component';
import { MoviesDataService } from './services/movies-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FilterBarComponent,
    ShowCardComponent,
    PaginationBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'movies-filter-bar';
  movies: any;

  constructor(private moviesDataService: MoviesDataService) {}

  ngOnInit() {
    this.moviesDataService.moviesData$.subscribe((movies) => {
      this.movies = movies;
      console.log('movies from app component', this.movies);
    });
  }
}

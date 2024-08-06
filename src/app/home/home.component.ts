import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';
import { ShowCardComponent } from '../show-card/show-card.component';
import { PaginationBarComponent } from '../pagination-bar/pagination-bar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MoviesDataService } from '../services/movies-data.service';
import { TmdbService } from '../services/tmdb.service';
import { FiltersStateService } from '../services/filters-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FilterBarComponent,
    ShowCardComponent,
    PaginationBarComponent,
    NavbarComponent,

    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private moviesDataService: MoviesDataService,
    private tmdb: TmdbService,
    private filtersStateService: FiltersStateService,
  ) {}

  title = 'movies-filter-bar';
  movies: any;
  hasReachedBottom = false; // Flag to track if the bottom has been reached

  ngOnInit() {
    this.moviesDataService.moviesData$.subscribe((movies) => {
      this.movies = movies;
      console.log('movies from app component', this.movies);
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrolledTo = window.scrollY + window.innerHeight;
    const threshold = 500;
    const isReachBottom = document.body.scrollHeight - threshold <= scrolledTo;

    if (isReachBottom && !this.hasReachedBottom) {
      this.hasReachedBottom = true;
      console.log('Reached near bottom');

      this.filtersStateService.filters.page++;

      // call API
      this.tmdb.discoverMovies(this.filtersStateService.filters).subscribe(
        (data) => {
          let newMovies = [...this.movies, ...data.results];
          this.moviesDataService.set(newMovies);
          this.movies = newMovies;
          console.log('movies from HOME', data);
        },
        (error) => {
          console.error('Error:', error);
        },
      );
    }

    // Reset the flag if the user scrolls away from the bottom
    if (!isReachBottom) {
      this.hasReachedBottom = false;
    }
  }
}

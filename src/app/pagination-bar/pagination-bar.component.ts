import { Component } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { FormsModule } from '@angular/forms';
import { FiltersStateService } from '../services/filters-state.service';
import { MoviesDataService } from '../services/movies-data.service';

@Component({
  selector: 'app-pagination-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pagination-bar.component.html',
  styleUrl: './pagination-bar.component.css',
})
export class PaginationBarComponent {
  page = 1;

  constructor(
    private tmdb: TmdbService,
    private filtersStateService: FiltersStateService,
    private moviesDataService: MoviesDataService,
  ) {}

  changePage(page: number): void {
    console.log('page', page);

    let updatedFilters = {
      ...this.filtersStateService.filters,
      page: page,
    };

    this.tmdb.discoverMovies(updatedFilters).subscribe(
      (data) => {
        this.moviesDataService.set(data);
      },
      (error) => {
        console.error('Error:', error);
      },
    );

    this.filtersStateService.set(updatedFilters);
  }
}

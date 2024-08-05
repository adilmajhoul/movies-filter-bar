import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { genres, languages } from './dropdown-data';
import { TmdbService } from '../services/tmdb.service';
import { MoviesDataService } from '../services/movies-data.service';
import { FiltersStateService } from '../services/filters-state.service';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnInit {
  genres = genres;
  languages = languages;

  isGenreOpen = false;
  isLanguageOpen = false;

  selectedGenres: Set<number> = new Set();
  selectedLanguages: Set<string> = new Set();

  constructor(
    private tmdb: TmdbService,
    private moviesDataService: MoviesDataService,
    private filtersStateService: FiltersStateService,
  ) {}

  movies: any;

  ngOnInit() {
    this.tmdb
      .discoverMovies({
        sort_by: 'popularity.desc',
        with_original_language: 'ar|he',
        with_genres: ['16', '99'],
      })
      .subscribe(
        (data) => {
          this.moviesDataService.set(data);
          this.movies = data;

          console.log('movies from app filter bar', this.movies);
        },
        (error) => {
          console.error('Error:', error);
        },
      );
  }

  toggleGenre(genreId: number) {
    if (this.selectedGenres.has(genreId)) {
      this.selectedGenres.delete(genreId);
    } else {
      this.selectedGenres.add(genreId);
    }
    console.log('Selected Genres:', this.selectedGenres);
  }

  toggleLanguage(languageId: string) {
    if (this.selectedLanguages.has(languageId)) {
      this.selectedLanguages.delete(languageId);
    } else {
      this.selectedLanguages.add(languageId);
    }
    console.log('Selected Genres:', this.selectedLanguages);
  }

  dropdownClick(propertyName: string) {
    (this as any)[propertyName] = !(this as any)[propertyName];
  }

  onFilter() {
    let filters = {
      with_genres: [...this.selectedGenres],
      with_original_language: [...this.selectedLanguages],
      page: 1,
    };

    this.tmdb.discoverMovies(filters).subscribe(
      (data) => {
        this.moviesDataService.set(data);
        this.movies = data;
      },
      (error) => {
        console.error('Error:', error);
      },
    );

    this.filtersStateService.set(filters);
  }
}

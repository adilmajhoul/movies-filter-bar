import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { genres, languages, years, countries } from './dropdown-data';
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
  years = years;
  countries = countries;

  isGenreOpen = false;
  isLanguageOpen = false;
  isYearOpen = false;
  isCountryOpen = false;

  selectedGenres: Set<number> = new Set();
  selectedLanguages: Set<string> = new Set();
  selectedYears: Set<number> = new Set();
  selectedCountries: Set<string> = new Set();

  constructor(
    private tmdb: TmdbService,
    private moviesDataService: MoviesDataService,
    private filtersStateService: FiltersStateService,
  ) {}

  movies: any;

  ngOnInit() {
    this.tmdb.discoverMovies(this.filtersStateService.filters).subscribe(
      (data) => {
        this.moviesDataService.set(data.results);

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
    console.log('Selected Languages:', this.selectedLanguages);
  }
  toggleYear(year: number) {
    if (this.selectedYears.has(year)) {
      this.selectedYears.delete(year);
    } else {
      this.selectedYears.add(year);
    }
    console.log('Selected Years:', this.selectedYears);
  }

  toggleCountry(countryId: string) {
    if (this.selectedCountries.has(countryId)) {
      this.selectedCountries.delete(countryId);
    } else {
      this.selectedCountries.add(countryId);
    }
    console.log('Selected countries:', this.selectedCountries);
  }

  dropdownClick(propertyName: string) {
    (this as any)[propertyName] = !(this as any)[propertyName];
  }

  onFilter() {
    let filters = {
      with_genres: [...this.selectedGenres],
      with_original_language: [...this.selectedLanguages],
      primary_release_year: [...this.selectedYears],
      with_origin_country: [...this.selectedCountries],

      page: 1,
    };

    this.tmdb.discoverMovies(filters).subscribe(
      (data) => {
        this.moviesDataService.set(data.results);
      },
      (error) => {
        console.error('Error:', error);
      },
    );

    this.filtersStateService.set(filters);
  }
}

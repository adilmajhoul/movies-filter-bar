import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiltersStateService {
  // initialFilters = {
  //   sort_by: 'popularity.desc',
  //   with_original_language: 'ar|he',
  //   with_genres: ['16', '99'],

  //   page: 1,
  // };

  initialFilters = {
    sort_by: 'popularity.desc',
    with_original_language: 'ja',
    // with_genres: ['16'],

    // with_origin_country: 'jp',
    primary_release_year: Math.floor(Math.random() * (2024 - 1990 + 1)) + 1990,

    page: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
  };

  filters = this.initialFilters;

  constructor() {}

  set(filtersState: any): void {
    this.filters = filtersState;

    console.log('current filters: ', this.filters);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiltersStateService {
  initialFilters = {
    sort_by: 'popularity.desc',
    with_original_language: 'ar|he',
    with_genres: ['16', '99'],

    page: 1,
  };

  filters = this.initialFilters;

  constructor() {}

  set(filtersState: any): void {
    this.filters = filtersState;

    console.log('current filters: ', this.filters);
  }
}

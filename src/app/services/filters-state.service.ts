import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiltersStateService {
  filters: any = {};

  constructor() {}

  set(filtersState: any): void {
    this.filters = filtersState;

    console.log('current filters: ', this.filters);
  }
}

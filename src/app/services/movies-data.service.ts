import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesDataService {
  private moviesDataSubject = new BehaviorSubject<any[]>([]);
  moviesData$ = this.moviesDataSubject.asObservable();

  constructor() {}

  set(movies: any[]): void {
    this.moviesDataSubject.next(movies);
  }
}

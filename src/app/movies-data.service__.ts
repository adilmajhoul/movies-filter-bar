import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesDataService {
  // BehaviorSubject is a type of Subject that requires an initial value and emits the current value to new subscribers.
  private moviesSubject = new BehaviorSubject<any[]>([]);

  // Expose the observable part of the BehaviorSubject to components.
  movies$ = this.moviesSubject.asObservable();

  // Method to update the movies data.
  setMovies(movies: any[]) {
    this.moviesSubject.next(movies);
  }
}

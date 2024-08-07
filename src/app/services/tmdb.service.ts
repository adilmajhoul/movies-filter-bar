// tmdb.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private apiKey = 'YOUR_TMDB_API_KEY';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Fetch popular movies
  discoverMovies(params: any): Observable<any> {
    const url = `${this.baseUrl}/discover/movie`;

    return this.http.get(url, {
      params: {
        api_key: environment.tmdbApiKey,
        ...params,
      },
    });
  }

  // Search for movies
  searchMovies(query: string): Observable<any> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`;
    return this.http.get(url);
  }
}

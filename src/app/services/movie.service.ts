import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class Movie {
  _id: number;
  title: string;
  overview: string;
  release_date: string;
}

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  endpoint = 'http://localhost:3000/movies';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  create(movie: Movie): Observable<any> {
    return this.httpClient.post<Movie>(this.endpoint, JSON.stringify(movie), this.httpOptions)
      .pipe(
        catchError(this.handleError<Movie>('Error occured'))
      );
  }

  get(id): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.endpoint + '/' + id)
      .pipe(
        tap(_ => console.log(`Movie fetched: ${id}`)),
        catchError(this.handleError<Movie[]>(`Get movie id=${id}`))
      );
  }

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.endpoint)
      .pipe(
        tap(movies => console.log('Movies retrieved!')),
        catchError(this.handleError<Movie[]>('Get movie', []))
      );
  }

  updateMovie(id, movie: Movie): Observable<any> {
    return this.httpClient.put(this.endpoint + '/' + id, JSON.stringify(movie), this.httpOptions)
      .pipe(
        tap(_ => console.log(`Movie updated: ${id}`)),
        catchError(this.handleError<Movie[]>('Update movie'))
      );
  }

  delete(id): Observable<Movie[]> {
    return this.httpClient.delete<Movie[]>(this.endpoint + '/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Movie deleted: ${id}`)),
        catchError(this.handleError<Movie[]>('Delete movie'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}

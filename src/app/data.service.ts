import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Films } from './films.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  BaseURL = 'http://www.omdbapi.com/?';
  apiKey = 'XXX';                // apiKey to get from this link : "https://www.omdbapi.com/apikey.aspx"

  constructor(private http: HttpClient) { }

// Fetches films based on a search string and page number.
  getFilms(srch: string, page: number ): Observable<any> {
    console.log(this.BaseURL + 'apikey=' + this.apiKey + '&s=' + srch + "*" + '&page=' + page);
    return this.http.get(this.BaseURL + 'apikey=' + this.apiKey + '&s=' + srch + "*" + '&page=' + page).pipe(
      map( (data: any) => {
         // Transforming the raw data into a more usable format.
        const films = data.Search.map( (item: any) => ({
          Title: item.Title,
          Year: item.Year,
          imdbID: item.imdbID,
          Type: item.Type,
          Poster: item.Poster
        }));

        // Parsing total results to a number for easier handling.
        const totalResults = parseInt(data.totalResults, 10);
        return { films, totalResults }
      })
    );
  }

  getFilmsContains(srch: string, page: number): Observable<any> {
    return this.getFilms(srch, page);
  }
// Fetches details of a film by its IMDb ID.
  getbyID(id: string): Observable<Films> {

     // Logging the URL for debugging purposes.
    console.log(this.BaseURL + 'apikey=' + this.apiKey + '&i=' + id);
    return this.http.get(this.BaseURL + 'apikey=' + this.apiKey + '&i=' + id).pipe(
      map( (data: any) => {
        return {
          Title: data.Title,
          Year: data.Year,
          imdbID: data.imdbID,
          Type: data.Type,
          Poster: data.Poster,
          Actors: data.Actors,
          Director: data.Director,
          Plot: data.Plot,
          Genre: data.Genre,
          Language: data.Language,
          Country: data.Country,
          Awards: data.Awards,
          Production: data.Production,
          Website: data.Website, 
          Released: data.Released,
          imbdRating: data.imdbRating,
          Runtime: data.Runtime
  
        }
      }),
      catchError((error: any) => {
         // Logging and handling errors.
        console.error('Error fetching films:', error);
        return [];
      })
    )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Films } from './films.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  BaseURL = 'http://www.omdbapi.com/?';
  apiKey = '700bbca8';                                      // apiKey to get from this link : "https://www.omdbapi.com/apikey.aspx"

  constructor(private http: HttpClient) { }

  getFilms(srch: string): Observable<Films[]> {
    return this.http.get(this.BaseURL + 'apikey=' + this.apiKey + '&s=' + srch + "*").pipe(
      map( (data: any) => data.Search.map( (item: any) => {
        return {
          Title: item.Title,
          Year: item.Year,
          imdbID: item.imdbID,
          Type: item.Type,
          Poster: item.Poster
        }
      })
    ))
  }

  getFilmsContains(srch: string): Observable<Films[]> {
    return this.getFilms(srch);
  }

  getbyID(id: string): Observable<Films> {
    
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
          Website: data.Website
        }
      }),
      catchError((error: any) => {
        console.error('Error fetching films:', error);
        return [];
      })
    )
  }
}

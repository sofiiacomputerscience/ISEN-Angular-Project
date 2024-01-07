import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Films } from './films.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  BaseURL = 'http://www.omdbapi.com/?';
  apiKey = '700bbca8';                                      // apiKey to get from this link : "https://www.omdbapi.com/apikey.aspx"

  constructor(private http: HttpClient) { }

  getFilms(srch: string, page: number ): Observable<Films[]> {
    console.log(this.BaseURL + 'apikey=' + this.apiKey + '&s=' + srch + "*" + '&page=' + page);
    return this.http.get(this.BaseURL + 'apikey=' + this.apiKey + '&s=' + srch + "*" + '&page=' + page).pipe(
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

  

  getFilmsContains(srch: string, page: number): Observable<Films[]> {
    
    return this.getFilms(srch, page);
  }

  //getbyID(id: string): Observable<Films> {
}

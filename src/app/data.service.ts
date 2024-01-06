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
    // Utilisation du paramètre 's' pour obtenir les résultats qui contiennent la chaîne spécifiée
    return this.getFilms(srch);
  }

  //getbyID(id: string): Observable<Films> {
}

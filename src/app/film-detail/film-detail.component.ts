import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

    film: any;
  
    constructor(
      private route: ActivatedRoute,
      private dataService: DataService
    ) { }
  
    ngOnInit(): void {
      console.log
      this.route.paramMap.pipe( 
        switchMap((params) => {
          const imdbID = params.get("id") ?? '';
          console.log('IMDB ID:', imdbID);
          return this.dataService.getbyID(imdbID);
        })
        ).subscribe(
          (film: any) => {
            this.film = film;
          }
      );
    }
}

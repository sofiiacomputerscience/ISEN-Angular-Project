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

    film: any; // Property to store the detailed information of a film.
  
    constructor(
      private route: ActivatedRoute,
      private dataService: DataService
    ) { }
  
    ngOnInit(): void {
      // Using route parameters to fetch film details.
      console.log()
      this.route.paramMap.pipe( 
        switchMap((params) => {
          // Extracting the IMDb ID from route parameters.
          const imdbID = params.get("id") ?? '';
          console.log('IMDB ID:', imdbID);
          // Fetching film details using the DataService.
          return this.dataService.getbyID(imdbID);
        })
        ).subscribe(
          (film: any) => {
            // Storing the fetched film details in the film property.
            this.film = film;
          }
      );
    }
}

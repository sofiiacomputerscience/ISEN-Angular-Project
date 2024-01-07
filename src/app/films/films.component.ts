import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Films } from '../films.interface';
import { debounce, debounceTime, filter, switchMap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ListFilmsResultComponent } from '../list-films-result/list-films-result.component';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  //   // Using service from angular platform-browser
  
    lastFilm: string = ''
    allFilms: Films[] = [] // Store all films fetched from the API.
    filtredFilms: Films[] = [] // Store filtered films based on search.

    searchForm: UntypedFormGroup
    searchControl: FormControl<string>

    showErrorMessage: boolean = false;
    currentPage: number = 1;

    totalResults: number = 0;

    constructor(private DataService: DataService, private titleService: Title) {

      // Set the page title.
      this.titleService.setTitle("Film - ISEN Angular");


       // Initialize the search form control with validation.
      this.searchControl = new FormControl<string>(
        '',
        {
          validators: [Validators.required],
          nonNullable: true
        }
      )
      this.searchForm = new UntypedFormGroup({
        search: this.searchControl
      })
    }
  
    ngOnInit(): void {
      // Initial API call to fetch films.
      this.DataService.getFilms('abc', this.currentPage).subscribe(
        ({ data, totalResults }) => {
          this.allFilms = data;
          this.totalResults = totalResults;
        }
      )
      
      // Subscribe to value changes of the search control.
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        switchMap((value: string) => {
          if (value.length >= 3) {
            this.showErrorMessage = false;
            this.currentPage = 1;
            return this.DataService.getFilmsContains(value, this.currentPage);
          } else {
            this.showErrorMessage = true;
            return [];
          } 
        })
      ).subscribe(
        ({ films, totalResults }) => {
          this.filtredFilms = films;
          this.totalResults = totalResults;
        });
      
    }


    // Method to fetch the next page of film results.
    onNextPage(): void {
      if (this.currentPage * 10 <= this.totalResults) {
        this.currentPage++;
        const searchTerm = this.searchControl.value;
        console.log(searchTerm);
        this.DataService.getFilmsContains(searchTerm, this.currentPage).subscribe(
          ({ films, totalResults }) => {
            this.filtredFilms = films;
            this.totalResults = totalResults;
          });
      }
      
    }

    // Method to fetch the previous page of film results.
    onPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        const searchTerm = this.searchControl.value;
        this.DataService.getFilmsContains(searchTerm, this.currentPage).subscribe(
        ({ films, totalResults }) => {
          this.filtredFilms = films;
          this.totalResults = totalResults;
        });
      }
    }

    // Event handler for custom events.
    onEvent = (event: any) => {
      this.lastFilm = event;
    }
    
}

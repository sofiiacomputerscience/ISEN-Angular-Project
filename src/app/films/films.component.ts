import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Films } from '../films.interface';
import { debounce, debounceTime, filter, switchMap } from 'rxjs';
import { ListFilmsResultComponent } from '../list-films-result/list-films-result.component';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  
    lastFilm: string = ''
    allFilms: Films[] = []
    filtredFilms: Films[] = []

    searchForm: UntypedFormGroup
    searchControl: FormControl<string>

    showErrorMessage: boolean = false;
    currentPage: number = 1;

    constructor(private DataService: DataService) {
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

      this.DataService.getFilms('abc', this.currentPage).subscribe(
        (data: any[]) => {
          this.allFilms = data
        }
      )

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
        (films: Films[]) => this.filtredFilms = films
      );
    }
    
    onNextPage(): void {
      this.currentPage++;
      const searchTerm = this.searchControl.value;
      console.log(searchTerm);
      this.DataService.getFilmsContains(searchTerm, this.currentPage).subscribe(
        (films: Films[]) => this.filtredFilms = films
        );
    }

    onPreviousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        const searchTerm = this.searchControl.value;
        console.log(searchTerm);
        this.DataService.getFilmsContains(searchTerm, this.currentPage).subscribe(
        (films: Films[]) => this.filtredFilms = films
        );
      }
    }
    onEvent = (event: any) => {
      this.lastFilm = event;
    }
}

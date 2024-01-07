import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-films-result',
  templateUrl: './list-films-result.component.html',
  styleUrls: ['./list-films-result.component.css']
})
export class ListFilmsResultComponent {
  
    @Input() rslt_films: any;
    @Output() eventOut = new EventEmitter<string>()

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    // Method to handle click events and navigate to film details page.
    onClickDetail() {
        this.router.navigate(['/film', this.rslt_films.imdbID])
    }

    ngOnDestroy(): void {
    }
}

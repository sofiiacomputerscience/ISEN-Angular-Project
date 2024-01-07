import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

 // Using service from angular platform-browser
 constructor(private titleService: Title){
  this.titleService.setTitle("Home - ISEN Angular");
 }

  shouldSpin = true;

}

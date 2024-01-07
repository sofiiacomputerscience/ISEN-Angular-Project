import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  // Using service from angular platform-browser
  constructor(private titleService: Title){
    this.titleService.setTitle("About - ISEN Angular");
   }
}

import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  // Set the page title.
  constructor(private titleService: Title){
    this.titleService.setTitle("About - ISEN Angular");
   }
}

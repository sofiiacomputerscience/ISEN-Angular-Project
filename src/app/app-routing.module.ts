import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importing routes for each component of navigation bar
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';


//Setting up routing for each component of navigation bar 
const routes: Routes = [
  {path: 'home', component: HomeComponent}, 
  {path: 'about', component: AboutComponent},

  //for any path except the one that we specified above, we will redirect to home component`
  {path: '**', component: HomeComponent, pathMatch: 'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

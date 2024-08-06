import { Routes } from '@angular/router';
import { ShowPageComponent } from './show-page/show-page.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'show', component: ShowPageComponent },
];

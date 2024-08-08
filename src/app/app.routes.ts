import { Routes } from '@angular/router';
import { ShowPageComponent } from './show-page/show-page.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'show', component: ShowPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
];

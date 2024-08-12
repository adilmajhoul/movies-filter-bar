import { Routes } from '@angular/router';
import { ShowPageComponent } from './show-page/show-page.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { S3CrudComponent } from './s3-crud/s3-crud.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'show', component: ShowPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },

  { path: 'profile', component: ProfileComponent },

  { path: 's3', component: S3CrudComponent },
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { UserGuardGuard } from './user-guard.guard';
import { UserLoginGuardGuard } from './user-login-guard.guard';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
  {path: '', redirectTo: "home", pathMatch: "full"},
  {path: 'home',canActivate: [UserGuardGuard], component: HomeComponent},
  {path: "login", canActivate: [UserLoginGuardGuard], component: UserLoginComponent},
  {path: "register", canActivate: [UserLoginGuardGuard], component: UserRegisterComponent},
  {path: "movieDetails/:id", canActivate: [UserGuardGuard], component: MovieDetailsComponent},
  {path: "editMovie/:id", canActivate: [UserGuardGuard], component: EditMovieComponent},
  {path: "addMovie", canActivate: [UserGuardGuard], component: AddMovieComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

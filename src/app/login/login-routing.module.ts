import {Routes} from '@angular/router';
import {LoginComponent} from "./login.component";
import {SignupComponent} from "./signup/signup.component";

//Dashboard Components

export const LoginRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'Inscription'
    }
  }

];


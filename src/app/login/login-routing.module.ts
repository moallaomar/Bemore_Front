import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

//Dashboard Components

import {LoginComponent} from "./login.component";
import {SignupComponent} from "./signup/signup.component";

export const LoginRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

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


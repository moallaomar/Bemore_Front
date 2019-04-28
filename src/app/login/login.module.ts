import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeConstants } from '../shared/config/theme-constant';

import { LoginRoutes} from './login-routing.module';

// Dashboard Component
import {LoginComponent} from "./login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import { SignupComponent } from './signup/signup.component';
import {AuthenticationService} from "../Service/authentication.service";

@NgModule({
    imports: [
      BrowserModule,
        RouterModule.forChild(LoginRoutes),
      FormsModule,
      ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
    ],
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    providers: [
        ThemeConstants, AuthenticationService,
    ]
})
export class LoginModule { }

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {CommonLayoutComponent} from './common/common-layout.component';
import {AuthenticationLayoutComponent} from './common/authentication-layout.component';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Sidebar_Directives} from './shared/directives/side-nav.directive';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
// Routing Module
import {AppRoutes} from './app.routing';
// App Component
import {AppComponent} from './app.component';
import {LoginModule} from './login/login.module';
import {QuizModule} from "./quiz/quiz.modules";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes, {useHash: true}),
    NgbModule.forRoot(),
    FormsModule,
    PerfectScrollbarModule,
    HttpClientModule,
    LoginModule,
    QuizModule,
  ],
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    AuthenticationLayoutComponent,
    Sidebar_Directives,

  ],
  providers: [],
  bootstrap: [AppComponent],
})


export class AppModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';

import { CommonLayoutComponent } from './common/common-layout.component';
import { AuthenticationLayoutComponent } from './common/authentication-layout.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Sidebar_Directives } from './shared/directives/side-nav.directive';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// Routing Module
import { AppRoutes } from './app.routing';

// App Component
import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import {AuthenticationService} from './Service/authentication.service';
import {QuestionService} from './Service/question.service';
import {AuthInterceptor} from './Service/auth.interceptor';
import {QuizService} from "./Service/quiz.service";
import {QuizModule} from "./quiz/quiz.modules";
import {AddQuizComponent} from "./quiz/add-quiz/add-quiz.component";
import {AnswerService} from "./Service/answer.service";
import { AddAnswerComponent } from './quiz/add-answer/add-answer.component';
import { ListQuizComponent } from './quiz/list-quiz/list-quiz.component';
import { ExamComponent } from './quiz/exam/exam.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes, { useHash: true }),
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
    providers: [AuthenticationService, QuestionService,QuizService, AnswerService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }, ],
    bootstrap: [AppComponent],
})


export class AppModule { }

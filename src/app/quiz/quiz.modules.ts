import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AddQuizComponent} from './add-quiz/add-quiz.component';
import {QuizRoutes} from "./quiz.routing";
import {CustomFormsModule} from "ng2-validation";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {NgSelectizeModule} from "ng-selectize";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArchwizardModule} from "angular-archwizard";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {AddQuestionComponent} from "./add-question/add-question.component";
import {AddAnswerComponent} from "./add-answer/add-answer.component";
import {JwBootstrapSwitchNg2Module} from "jw-bootstrap-switch-ng2";
import {ListQuizComponent} from "./list-quiz/list-quiz.component";
import {DataTablesModule} from "angular-datatables";
import {ExamComponent} from "./exam/exam.component";
import {AuthenticationService} from "../Service/authentication.service";
import {QuestionService} from "../Service/question.service";
import {QuizService} from "../Service/quiz.service";
import {AnswerService} from "../Service/answer.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../Service/auth.interceptor";
import {MinuteSecondsPipe} from "./Util/MinuteSecondsPipe";


@NgModule({
  imports: [
    RouterModule.forChild(QuizRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    NgSelectizeModule,
    NgbModule,
    Ng2SmartTableModule,
    CustomFormsModule,
    JwBootstrapSwitchNg2Module,
    DataTablesModule,
  ],
  declarations: [
    AddQuizComponent,
    AddQuestionComponent,
    AddAnswerComponent,
    ListQuizComponent,
    ExamComponent,
    MinuteSecondsPipe,
  ],
  providers: [QuestionService,QuizService, AnswerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, ],
  bootstrap:    [ AddQuizComponent],

})
export class QuizModule {

}

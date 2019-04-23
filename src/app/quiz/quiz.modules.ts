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
    CustomFormsModule
  ],
  declarations: [
    AddQuizComponent,
    AddQuestionComponent,
    AddAnswerComponent,
  ],
  bootstrap:    [ AddQuizComponent],

})
export class QuizModule {
}

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AddQuizComponent} from './add-quiz/add-quiz.component';
import { ManageQuizComponent} from './manage-quiz/manage-quiz.component';
import {QuizRoutes} from "./quiz.routing";
import {CustomFormsModule} from "ng2-validation";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {NgSelectizeModule} from "ng-selectize";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArchwizardModule} from "angular-archwizard";


@NgModule({
  imports: [
    RouterModule.forChild(QuizRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    NgSelectizeModule,
    NgbModule,
    CustomFormsModule
  ],
  declarations: [
    AddQuizComponent,
    ManageQuizComponent
  ]
})
export class QuizModule {
}

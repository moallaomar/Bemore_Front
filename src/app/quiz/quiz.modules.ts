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
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ModalComponent} from "./add-quiz/modal/modal.component";
import {BrowserModule} from "@angular/platform-browser";


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
    ManageQuizComponent,
    ModalComponent
  ],
  bootstrap:    [ AddQuizComponent],

})
export class QuizModule {
}

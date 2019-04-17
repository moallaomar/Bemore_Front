import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DataTablesModule} from 'angular-datatables';
//Tables Component
import {AddQuizComponent} from './add-quiz/add-quiz.component';
import { ManageQuizComponent} from './manage-quiz/manage-quiz.component';
import {QuizRoutes} from "./quiz.routing";


@NgModule({
  imports: [
    RouterModule.forChild(QuizRoutes),
    DataTablesModule
  ],
  declarations: [
    AddQuizComponent,
    ManageQuizComponent
  ]
})
export class QuizModule {
}

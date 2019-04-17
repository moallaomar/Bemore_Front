import {Routes} from '@angular/router';
//Tables Components
import {AddQuizComponent} from './add-quiz/add-quiz.component';
import {ManageQuizComponent} from './manage-quiz/manage-quiz.component';

export const QuizRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add-quiz',
        component: AddQuizComponent,
        data: {
          title: 'Ajouter un quiz'
        }
      },
      {
        path: 'manage-quiz',
        component: ManageQuizComponent,
        data: {
          title: 'Gerer les quiz'
        }
      }
    ]
  }
];


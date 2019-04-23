import {Routes} from '@angular/router';

import {AddQuizComponent} from './add-quiz/add-quiz.component';
import {AddQuestionComponent} from "./add-question/add-question.component";
import {AddAnswerComponent} from "./add-answer/add-answer.component";

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
        path: 'add-question',
        component: AddQuestionComponent,
        data: {
          title: 'Ajouter des questions'
        }
      },
      {
        path: 'add-answer/:id',
        component: AddAnswerComponent,
        data: {
          title: 'Ajouter les réponses'
        }
      },

    ]
  }
];


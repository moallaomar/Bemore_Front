import {Routes} from '@angular/router';

import {AddQuizComponent} from './add-quiz/add-quiz.component';
import {AddQuestionComponent} from "./add-question/add-question.component";
import {AddAnswerComponent} from "./add-answer/add-answer.component";
import {ListQuizComponent} from "./list-quiz/list-quiz.component";
import {ExamComponent} from "../exam/exam.component";
import {ListQuizuserComponent} from "./list-quizuser/list-quizuser.component";
import {AddUserComponent} from "./add-user/add-user.component";

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
        path: 'add-question/:id',
        component: AddQuestionComponent,
        data: {
          title: 'Ajouter des questions'
        }
      },
      {
        path: 'add-user',
        component: AddUserComponent,
        data: {
          title: 'Ajouter un Utilisateur'
        }
      },
      {
        path: 'add-answer/:id',
        component: AddAnswerComponent,
        data: {
          title: 'Ajouter les réponses'
        }
      },
      {
        path: 'list-quiz',
        component: ListQuizComponent,
        data: {
          title: 'Gèrer les tests'
        }
      },
      {
        path: 'list-quizuser',
        component: ListQuizuserComponent,
        data: {
          title: 'Résultat'
        }
      },

    ]
  }
];


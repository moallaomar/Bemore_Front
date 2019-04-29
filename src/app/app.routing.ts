import {Routes} from '@angular/router';
// Layouts
import {CommonLayoutComponent} from './common/common-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },

      {
        path: 'quiz',
        loadChildren: './quiz/quiz.modules#QuizModule'
      }
    ]
  },

];


import {Quiz} from "./Quiz.model";
import {appUser} from "./appUser.model";

export class QuizUser {
  id: number;
  appUser: appUser;
  quiz: Quiz;
  score: number;
  nbQuestion: number;
  passedDateTime: Date;

  constructor() {

  }
}

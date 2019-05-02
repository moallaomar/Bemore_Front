import {Question} from "./question.model";
import {Answer} from "./answer.model";
import {QuizUser} from "./QuizUser";

export class QuizAnswer {


  id: number;
  quizUser: QuizUser;
  question: Question;

  selectedAnswer: Answer;

  constructor() {

  }

}

import {Question} from "./question.model";
import {QuizConfig} from "./quiz-config";

export class Quiz {


  id: number
  name: string
  description: string;
  question: Question[];
  createdDate: Date;
  config: QuizConfig;

  constructor() {
  }


}

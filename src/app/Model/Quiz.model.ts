import {Question} from "./question.model";
import DateTimeFormat = Intl.DateTimeFormat;
import {QuizConfig} from "./quiz-config";

export class Quiz {


  constructor() {
  }
id:number
  name:string
   description:string;
  question:Question[];
  createdDate: Date;
  config: QuizConfig;



}

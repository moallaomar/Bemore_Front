import {Question} from "./question.model";

export class Answer {


  constructor(data:any) {
this.id = data.id;
this.content = data.content;
this.correct = data.correct;
  }
    id:number;
  content: string;
  correct: boolean;
}


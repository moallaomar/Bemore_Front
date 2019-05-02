import {Answer} from "./answer.model";

export class Question {


  id: number;
  content: string;
  answered: boolean;
  answers: Answer[];

  constructor() {
  }


}

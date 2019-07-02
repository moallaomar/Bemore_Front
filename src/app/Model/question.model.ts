import {Answer} from "./answer.model";

export class Question {


  id: number;
  content: string;
  content_fr:string;
  answered: boolean;
  answers: Answer[];

  constructor() {
  }


}

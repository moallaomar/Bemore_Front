import {Question} from "./question.model";
import DateTimeFormat = Intl.DateTimeFormat;

export class Quiz {


  constructor() {
  }
id:number
  name:string
   description:string;
  question:Question[];
  createdDate: Date;


}

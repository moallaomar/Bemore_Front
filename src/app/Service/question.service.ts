import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Question} from "../Model/question.model";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  host2:string = "http://localhost:8080";


  constructor(private http:HttpClient){

  }

  getQuestion(){
    return  this.http.get<Question[]>(this.host2+'/questions');
  }




}

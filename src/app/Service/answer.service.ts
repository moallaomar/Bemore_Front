import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Answer} from "../Model/answer.model";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  host2: string = "http://localhost:8080";


  constructor(private http: HttpClient) {

  }

  getAnswersByQuestionId(id:number){
    return this.http.get<Answer[]>(this.host2+'/answer/'+id);
  }

  saveAnswer(answer: Answer , id : number) {
    return this.http.post<Answer>(this.host2 + '/answer/'+id, answer);
  }

  getLastId(){
    return this.http.get<number>(this.host2+'/answer/count')
  }
  deleteById(id:number){
    return this.http.delete<String>(this.host2+'/answer/'+id);
  }
  findAnswerById(id:number){
    return this.http.get<Answer>(this.host2+'/answers/'+id);
  }


}

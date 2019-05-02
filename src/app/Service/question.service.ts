import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Question} from "../Model/question.model";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  host2: string = "http://localhost:8080";


  constructor(private http: HttpClient) {

  }

  getQuestion() {
    return this.http.get<Question[]>(this.host2 + '/questions');
  }

  createQuestion(question: Question, id: number) {

    return this.http.post<Question>(this.host2 + '/question/' + id, question);
  }

  getQuestionByID(id: number) {
    return this.http.get<Question>(this.host2 + '/question/' + id);
  }

  deleteQuestionById(id: number) {
    return this.http.delete(this.host2 + '/question' + '/' + id);
  }

  getLastId() {
    return this.http.get<number>(this.host2 + '/question/count')
  }


}

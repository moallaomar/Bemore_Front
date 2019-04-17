import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Quiz} from "../Model/Quiz.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  host2: string = "http://localhost:8080";

  constructor(private http:HttpClient){

  }

  createQuiz(quiz:Quiz){

    return this.http.post<Quiz>(this.host2+'/quiz', quiz)

  }



}

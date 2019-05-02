import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {QuizUser} from "../Model/QuizUser";

@Injectable({
  providedIn: 'root'
})
export class QuizUserService {
  host2: string = "http://localhost:8080";

  constructor(private http: HttpClient) {

  }

  findAll() {
    return this.http.get<QuizUser[]>(this.host2 + '/quizuser');

  }

}


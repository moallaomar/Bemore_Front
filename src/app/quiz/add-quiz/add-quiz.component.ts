import { Component } from '@angular/core';
import {QuizService} from "../../Service/quiz.service";

@Component ({
    templateUrl: 'add-quiz.html'
})

export class AddQuizComponent {
    constructor(private quizService: QuizService) { }

  public isCompleted: any;
  public onStep2Next: any;
  public onStep3Next: any;
  public onComplete: any;


  NewQuiz(data){
    console.log(data);
this.quizService.createQuiz(data).subscribe();
  }



}

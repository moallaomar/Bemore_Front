import {Component, OnInit} from '@angular/core';
import {Question} from "../../Model/question.model";
import {QuestionService} from "../../Service/question.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {QuizService} from "../../Service/quiz.service";

@Component({
  templateUrl: 'add-question.html'
})

export class AddQuestionComponent implements OnInit {

  question: Question = new Question();
  id: number;
  questions: Question[] = [];

  constructor(private questionService: QuestionService, private activatedRoute: ActivatedRoute, private quizService: QuizService) {
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = +params.get("id");
        this.id = id;
        return this.quizService.getQuizbyId(id)// http request
      })
    ).subscribe(quiz => {
      this.questions = quiz;
    });


  }


  addQuestion(newQuestion: string) {
    if (newQuestion) {
      question : this.question = new Question();
      this.question.content = newQuestion.toString();

      this.questionService.getLastId().subscribe(data => {
        this.question.id = data + 1
      });
      this.questions.push(this.question);
      this.questionService.createQuestion(this.question, this.id).subscribe()


    }
  }

  deleteQuestion(question: Question) {
    for (var i = 0; i < this.questions.length; i++) {
      if (this.questions[i] === question) {
        this.questions.splice(i, 1);
        this.questionService.deleteQuestionById(question.id).subscribe();
      }
    }
  }
}

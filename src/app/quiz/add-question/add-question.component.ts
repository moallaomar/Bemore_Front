import { Component, OnInit } from '@angular/core';
import {Question} from "../../Model/question.model";
import {QuestionService} from "../../Service/question.service";

@Component ({
    templateUrl: 'add-question.html'
})

export class AddQuestionComponent implements OnInit {

  question : Question = new Question();

  constructor(private questionService:QuestionService){}
  questions: Question[] = [];


    ngOnInit(): void {

    }


  addQuestion(newQuestion: string) {
    if (newQuestion) {
      question : this.question = new Question();
      this.question.content = newQuestion.toString();

      this.questionService.getLastId().subscribe(data => {
        this.question.id = data + 1
      });

      // this.question.id=this.questions.length+1;
      this.questions.push(this.question);
      this.questionService.createQuestion(this.question).subscribe()


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

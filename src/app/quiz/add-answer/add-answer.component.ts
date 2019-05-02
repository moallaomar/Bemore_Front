import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../Service/question.service";
import {switchMap} from "rxjs/operators";
import {Question} from "../../Model/question.model";
import {Answer} from "../../Model/answer.model";
import {AnswerService} from "../../Service/answer.service";

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
})
export class AddAnswerComponent implements OnInit {


  question: Question = new Question();
  answer:Answer = new Answer();
  answers: Answer[] = [];

  constructor(private activatedRoute: ActivatedRoute, private questionService:QuestionService,private answerService:AnswerService) {
  }



  ngOnInit() {

    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = +params.get("id")
        return this.questionService.getQuestionByID(id)// http request
      })).subscribe(question =>{ this.question = question;
                                this.answers = question.answers;});
  }
  setTrue(){
    this.answer.correct = true;
  }
  setFalse(){
    this.answer.correct = false;
  }
  addAnswer(newAnswer: string) {
    if (newAnswer) {
      Answer : this.answer = new Answer();
      this.answer.content = newAnswer.toString();
      this.answerService.getLastId().subscribe(data => {
        this.answer.id = data + 1
      });
      this.answers.push(this.answer);
      this.answerService.saveAnswer(this.answer, this.question.id).subscribe();
    }
  }

  deleteAnswer(answer: Answer) {
    for (var i = 0; i < this.answers.length; i++) {
      if (this.answers[i] === answer) {
        this.answers.splice(i, 1);
      }}
    this.answerService.deleteById(answer.id).subscribe();
  }
}

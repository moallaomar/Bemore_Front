import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../Service/question.service";
import {switchMap} from "rxjs/operators";
import {Question} from "../../Model/question.model";

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
})
export class AddAnswerComponent implements OnInit {

  question: Question = new Question();

  constructor(private activatedRoute: ActivatedRoute, private questionService:QuestionService) { }



  ngOnInit() {

    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = +params.get("id")
        return this.questionService.getQuestionByID(id);// http request
      })).subscribe(question => this.question = question);

    console.log(this.question);


  }

}

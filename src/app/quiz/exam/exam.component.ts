import { Component, OnInit } from '@angular/core';
import {switchMap} from "rxjs/operators";
import {QuestionService} from "../../Service/question.service";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../Service/quiz.service";
import {Quiz} from "../../Model/Quiz.model";
import {Question} from "../../Model/question.model";
import {QuizConfig} from "../../Model/quiz-config";
import {Answer} from "../../Model/answer.model";
import index from "@angular/cli/lib/cli";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  mode = 'quiz';
private questions:Question[] = [];
  quiz: Quiz = new Quiz();
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';

  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService) {}


  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = +params.get("id");
        return this.quizService.getQuizbyId(id)// http request
      })
    ).subscribe(quiz =>{ this.questions = quiz;
      this.pager.count = this.questions.length;
      this.startTime = new Date();
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    });
    this.mode = 'quiz';
    }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.questions) ?
      this.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, answer: Answer) {

      question.answers.forEach((x) => { if (x.id !== answer.id) x.selected = false; });


    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.answers.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.answers.every(x => x.selected === x.correct) ? 'correct' : 'wrong';
  };

  onSubmit() {
    let answers = [];
    this.questions.forEach(x => answers.push({ 'questionId': x.id, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    this.mode = 'result';

  }
}

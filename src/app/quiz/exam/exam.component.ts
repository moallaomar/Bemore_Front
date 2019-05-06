import {Component, OnInit} from '@angular/core';
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../Service/quiz.service";
import {Quiz} from "../../Model/Quiz.model";
import {Question} from "../../Model/question.model";
import {QuizConfig} from "../../Model/quiz-config";
import {Answer} from "../../Model/answer.model";
import {AnswerService} from "../../Service/answer.service";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  score: number = 0;
  mode = 'quiz';
  quiz: Quiz = new Quiz();
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 120,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': true,
    'shuffleQuestions': true,
    'shuffleOptions': true,
    'showClock': true,
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
  name: string;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  private questions: Question[] = [];

  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService, private router: Router, private answerService: AnswerService) {
  }

  get filteredQuestions() {
    return (this.questions) ?
      this.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = +params.get("id");
        this.quiz.id = id;
        return this.quizService.getQuizbyId(id)// http request
      })
    ).subscribe(quiz => {
      if (quiz == null) {
        this.router.navigate(['/dashboard'])
      } else {
        this.questions = quiz;
        this.pager.count = this.questions.length;
        this.startTime = new Date();
        this.timer = setInterval(() => {
          this.tick();
        }, 1000);
        this.duration = this.parseTime(this.config.duration);
        this.mode = 'quiz';
      }

    });
    this.quizService.getQuizby(this.quiz.id).subscribe(data => {
      this.name = data.name
    });


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

  onSelect(question: Question, answer: Answer) {

    question.answers.forEach((x) => {
      if (x.id !== answer.id) x.selected = false;
    });


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
    return question.answers.find(x => x.selected) ? 'Répondu' : 'Pas répondu';
  };

  isCorrect(question: Question) {
    return question.answers.every(x => x.selected === x.correct) ? 'correcte' : 'incorrecte';
  };

  onSubmit() {
    clearInterval(this.timer);
    let answers = [];
    this.questions.forEach(question => {
      let selected = question.answers.find(answer => answer.selected);
      answers.push({'questionId': question.id, 'answered': (selected ? selected.id : null)});
    });
    let last: any
    answers.forEach(elem => {
      if (elem.answered != null) {

        this.answerService.findAnswerById(elem.answered).subscribe(data => {
          if (data.correct) {

            this.score++;
            localStorage.setItem("Score", this.score.toString());
          }
        })

      }
    });
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    sleep(500).then(() => {
      let x = localStorage.getItem("Score");
      if (x == null) {
        x = '0';
        localStorage.removeItem("Score");
        this.quizService.submitQuiz({id: this.quiz.id, answers: answers}, x).subscribe();
      } else {
        localStorage.removeItem("Score");
        this.quizService.submitQuiz({id: this.quiz.id, answers: answers}, x.toString()).subscribe();
      }
      this.mode = 'result'

    })


  }
}

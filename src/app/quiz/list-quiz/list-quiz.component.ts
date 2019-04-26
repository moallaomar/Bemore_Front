import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {QuizService} from "../../Service/quiz.service";
import {Quiz} from "../../Model/Quiz.model";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit , OnDestroy, AfterViewInit {

  quizes : Quiz[] = [];
  dtTrigger: Subject<Quiz> = new Subject();
  quiz:Quiz = new Quiz();
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filtredQuiz = this.listFilter ? this.performFilter(this.listFilter) : this.quizes;
  }

  filtredQuiz: Quiz[] = [];

  constructor(private quizService:QuizService, private router:Router) { }

  ngOnInit() {

    this.getAll();

  }
  performFilter(filterBy: string): Quiz[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.quizes.filter((quiz: Quiz) =>
      quiz.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  getAll() {
    this.quizService.getAll().subscribe(data => {
      this.quizes = data;
      this.filtredQuiz = this.performFilter(this.listFilter);

    });
  }
  ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
  }
  deleteQuiz(id: number){
    this.quizService.deleteQuiz(id).subscribe(() => {
      this.getAll();
    });
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
}

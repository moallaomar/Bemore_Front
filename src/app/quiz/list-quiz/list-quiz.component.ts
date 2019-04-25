import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {QuizService} from "../../Service/quiz.service";
import {Quiz} from "../../Model/Quiz.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit , OnDestroy, AfterViewInit {

  dtOptions: DataTables.Settings = {};
  quizes : Quiz[] = []
  dtTrigger: Subject<Quiz> = new Subject();

  constructor(private quizService:QuizService) { }

  ngOnInit() {

    this.getAll();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7,
      lengthChange: false,
      info: false,
      language: {
        search: "Rechercher"
      },
    };
  }
  getAll() {
    this.quizService.getAll().subscribe(data => {
      this.quizes = data;
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deleteQuiz(id: number){
    this.quizService.deleteQuiz(id).subscribe(()=> {
      this.getAll();
    });
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

}

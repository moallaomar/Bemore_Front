import {Component, OnInit} from '@angular/core';
import {QuizUserService} from "../../Service/quizuser.service";
import {QuizUser} from "../../Model/QuizUser";

@Component({
  selector: 'app-list-quizuser',
  templateUrl: './list-quizuser.component.html',
  styleUrls: ['./list-quizuser.component.css']
})
export class ListQuizuserComponent implements OnInit {


  quizUsers: QuizUser[] = [];
  username: string[] = [];
  filtredQuizUser: QuizUser[] = [];

  constructor(private quizUserService: QuizUserService) {
  }

  _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filtredQuizUser = this.listFilter ? this.performFilter(this.listFilter) : this.quizUsers;
  }

  performFilter(filterBy: string): QuizUser[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.quizUsers.filter((quizUser: QuizUser) =>
      quizUser.appUser.username.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {

    this.quizUserService.findAll().subscribe(data => {
      this.quizUsers = data;
      this.filtredQuizUser = this.performFilter(this.listFilter);
    });
  }

}

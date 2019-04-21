import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../Service/quiz.service";
import {Question} from "../../Model/question.model";
import {QuestionService} from "../../Service/question.service";
import {Quiz} from "../../Model/Quiz.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "./modal/modal.component";

@Component ({
    templateUrl: 'add-quiz.html'
})

export class AddQuizComponent {

  constructor(private quizService: QuizService,private questionService:QuestionService,public modalService: NgbModal) { }

quiz:Quiz;


  name:string;
  questionAux: Question = new Question();

  question: Question = new Question();

  public isCompleted: any;
  public onStep2Next: any;
  public onStep3Next: any;
  public onComplete: any;
questions:Question[] = [];
  display: boolean = false;

  NewQuiz(data){
    this.name = data.name;
this.quizService.isQuizName(this.name).subscribe(res => {


  if(res.toString() == "true"){
            console.log('famma menou');
            this.display == true;
  }
  else {
    this.quizService.createQuiz(data).subscribe();
  }
})}

  openModal(question : Question) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.Question = question;
  }


  addQuestion(newQuestion:string){
    if(newQuestion){
      question : this.question = new Question();
      this.questionAux.content = newQuestion;
      this.question.content = newQuestion.toString();

      this.questionService.getLastId().subscribe(data => {this.question.id  = data +1});

     // this.question.id=this.questions.length+1;
      this.questions.push(this.question);
      this.questionService.createQuestion(this.question).subscribe()



    }
  }


  deleteQuestion(question: Question){
    for( var i = 0; i < this.questions.length; i++){
      if ( this.questions[i] === question) {
        this.questions.splice(i, 1);
        this.questionService.deleteQuestionById(question.id).subscribe();
      }
    }
  }


}

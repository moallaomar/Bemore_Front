import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../Service/quiz.service";
import {QuestionService} from "../../Service/question.service";
import {Quiz} from "../../Model/Quiz.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'add-quiz.html'
})

export class AddQuizComponent implements OnInit{
  submitted = false;
  name: string;

  description: string;

  quizForm: FormGroup;

  constructor(private quizService: QuizService, private questionService: QuestionService,private formBuilder: FormBuilder,private router:Router) {
  }

  ngOnInit(): void {
    this.quizForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


  quiz: Quiz;





  public isCompleted: any;
  public onStep2Next: any;
  public onStep3Next: any;
  public onComplete: any;
  display: boolean = false;

  NewQuiz(data) {

      this.name = data.name;
      console.log(data);
      this.quizService.isQuizName(this.name).subscribe(res => {

        if (res.toString() == "true") {
          console.log('famma menou');
          this.display == true;
          this.submitted = false


        } else {

          this.quizService.createQuiz(data).subscribe();
          this.router.navigateByUrl('/quiz/add-question')
        }
      })

  }


}

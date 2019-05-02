import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MustMatch} from "./mustmatch";
import {AuthenticationService} from "../../Service/authentication.service";
import {UserForm} from "../../Model/UserForm";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username: string;
  password: string;
  submitted = false;
  confirmedPassword: string
  userform: UserForm;
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {
  }

  get f() {
    return this.signupForm.controls;
  }

  ngOnInit() {


    this.signupForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmedPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmedPassword')
      });
  }

  signup(data) {

    this.submitted = true;


    this.authService.register(data).subscribe(resp => {

        this.router.navigateByUrl('/login');
      }, error1 => {
        console.log("erreur");
      }
    );
    if (this.signupForm.invalid) {
      console.log('invalid broooooooo !!!!!');
    }
  }
}

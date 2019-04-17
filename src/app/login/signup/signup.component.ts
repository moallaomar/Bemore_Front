import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MustMatch} from "./mustmatch";
import {AuthenticationService} from "../../Service/authentication.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username: string;
  password: string;
  submitted = false;
  confirmedPassword:string
  signupForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private authService: AuthenticationService, private router:Router) { }

  ngOnInit() {


    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
        confirmedPassword: ['', Validators.required]},
      {validator: MustMatch('password', 'confirmedPassword')
    });
  }
  get f() { return this.signupForm.controls; }

  signup(data){

    this.submitted = true;
    console.log(data);

    this.authService.register(data).subscribe(resp => {
        console.log('succes');
        this.router.navigateByUrl('/login');
      }, error1 => {
      console.log("erreur");}
    );
    if (this.signupForm.invalid) {
      console.log('invalid broooooooo !!!!!');
    }
  }
}

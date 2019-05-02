import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators,} from "@angular/forms";
import {AuthenticationService} from "../Service/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode: number = 0;
  submitted = false;
  username: string;

  password: string;
  loginForm: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  onLogin(data) {

    this.submitted = true;
    this.authService.login(data)
      .subscribe(resp => {
        let jwt = resp.headers.get('Authorization');

        this.authService.saveToken(jwt);
        this.router.navigateByUrl('/dashboard')
      }, error1 => {
        console.log("erreur");
        this.mode = 1;
      })


  }


}

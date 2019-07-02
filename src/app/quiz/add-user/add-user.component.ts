import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../Service/authentication.service";
import {UserForm} from "../../Model/UserForm";
import {MustMatch} from "./mustmatch";
import {ToastOptions, ToastyConfig, ToastyService} from "ng2-toasty";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  username: string;
  password: string;
  submitted = false;
  confirmedPassword: string
  signupForm: FormGroup;

  toastOptionsSuccess: ToastOptions = {
    title: "Succès",
    msg: "l'utilisateur a été ajouté avec succès",
    showClose: true,
    timeout: 4000,
    theme: 'bootstrap',
  };

  toastOptionsWarn: ToastOptions = {
    title: "",
    msg: "Veuillez remplir les champs",
    showClose: true,
    timeout: 4000,
    theme: 'bootstrap',
  };

  toastOptionsFail: ToastOptions = {
    title: "Echec",
    msg: "Le login existe déja",
    showClose: true,
    timeout: 4000,
    theme: 'bootstrap',
  };


  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router
    , private toastyService: ToastyService, private toastyConfig: ToastyConfig) {

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
    this.submitted = false;

  }

  signup(data) {
    if (this.signupForm.invalid) {
      //this.submitted = false;
      this.submitted = true;

      this.toastyService.warning(this.toastOptionsWarn);
    } else {
this.submitted = false;
      this.authService.register(data).subscribe(resp => {

          this.toastyService.success(this.toastOptionsSuccess);
            this.signupForm.reset();
        }, error1 => {

          this.toastyService.error(this.toastOptionsFail)
        }
      );
    }
  }
}


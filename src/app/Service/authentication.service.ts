import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import {observable} from "rxjs";
import {User} from "../Model/user_model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  redirectUrl:String;
  currentUser: User;
    host2:string = "http://localhost:8080";
  private  jwt:string;
  private  username:string;
  private roles:Array<any>=[];
  constructor(private http:HttpClient) { }


  register(data){
    return this.http.post(this.host2+"/register", data ,{observe: 'response'})
  }

  login(data){
  console.log('here');
  console.log(data);
    return this.http.post(this.host2+"/login", data, {observe: 'response'});
  }
saveToken(jwt:string){
    this.jwt = jwt;
    localStorage.setItem("token", jwt);
  let jwtHelper = new JwtHelperService();
    this.roles = jwtHelper.decodeToken(this.jwt).roles;
    }

  loadToken(){
    this.jwt = localStorage.getItem('token');
    return this.jwt;
  }

  logout() {
    localStorage.removeItem('token');

  }
  getCurrentUser(){
   return  this.http.get(this.host2+'/current');
  }
  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

}

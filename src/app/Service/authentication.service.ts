import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from "../Model/user_model";
import {UserForm} from "../Model/UserForm";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  redirectUrl: String;
  currentUser: User;
  host2: string = "http://localhost:8080";
  private jwt: string;
  private username: string;
  private roles: Array<any> = [];
  private httpClient: HttpClient;

  constructor(private http: HttpClient, handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }



  register(data) {
    console.log(data);
  /*  var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers }); */
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem("token")
      })
    };
    return this.httpClient.post<UserForm>(this.host2 + "/register", data, httpOptions)
  }

  login(data):Observable<any> {

    return this.http.post(this.host2 + "/login", data, {observe: 'response'});
  }

  saveToken(jwt: string) {
    this.jwt = jwt;
    localStorage.setItem("token", jwt);
    let jwtHelper = new JwtHelperService();
    this.roles = jwtHelper.decodeToken(this.jwt).roles;
  }

  loadToken() {
    this.jwt = localStorage.getItem('token');
    return this.jwt;
  }

  logout() {
    localStorage.removeItem('token');

  }

  getCurrentUser() {
    return this.http.get(this.host2 + '/current');
  }

}

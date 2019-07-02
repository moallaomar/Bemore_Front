import {Component} from '@angular/core';
import 'ammap3';
import 'ammap3/ammap/maps/js/usaLow';
import 'src/assets/js/jquery.sparkline/jquery.sparkline.js';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {CurrentUser} from "../Model/currentUser";
import {AuthenticationService} from "../Service/authentication.service";
import {QuizService} from "../Service/quiz.service";
import {Quiz} from "../Model/Quiz.model";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'dashboard.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  public weather: any;
  private roles: Array<any> = [];
  private display: boolean = false;
  private appId: string;
  private appCode: string;
  private currentUser: CurrentUser;
  private quizes: Quiz[] = [];

  public constructor(private http: HttpClient, private authService: AuthenticationService, private quizService: QuizService, private router: Router) {
    this.appId = "G3FPZ7gZn5VbCAuo3jiz";
    this.appCode = "lhVpg4SR_GwU3ZSges8ikA";
    this.weather = [];
  }

  public ngOnInit() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.getWeather(position.coords);
      });
    } else {
      console.error("The browser does not support geolocation...");
    }

    this.authService.getCurrentUser().subscribe(data => {

      this.currentUser = data as CurrentUser;
      this.roles = this.currentUser.authorities;

    });

    this.quizService.getAll().subscribe(data => {
      this.quizes = data
    });
  }

  redirect(data) {
    this.quizService.getQuizbyId(data).subscribe(quiz => {
      if (quiz == null) {
        this.display = true;
      } else {
        this.router.navigate(['/exam/', data])
      }
    });
  }

  isAdmin() {
    for (let r of this.roles) {
      if (r.authority == 'ADMIN') {
        return true;
      }
    }
    return false;
  }

  isAuthenticated() {
    return this.roles && (this.isAdmin() || this.isUser());
  }

  isUser() {
    for (let r of this.roles) {
      if (r.authority == 'USER') {
        return true;
      }
    }
    return false;
  }

  public getWeather(coordinates: any) {
    this.http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=" + coordinates.latitude + "&longitude=" + coordinates.longitude + "&app_id=" + this.appId + "&app_code=" + this.appCode, "jsonpCallback")
      .pipe(map(result => (<any>result).dailyForecasts.forecastLocation))
      .subscribe(result => {
        this.weather = result.forecast;
      }, error => {
        console.error(error);
      });
  }


}

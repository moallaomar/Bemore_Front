import {Component} from '@angular/core';
import {ThemeConstants} from '../shared/config/theme-constant';
import 'ammap3';
import 'ammap3/ammap/maps/js/usaLow';
import 'src/assets/js/jquery.sparkline/jquery.sparkline.js';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {CurrentUser} from "../Model/currentUser";
import {AuthenticationService} from "../Service/authentication.service";

@Component({
    templateUrl: 'dashboard.html'
})

export class DashboardComponent {
  private roles: Array<any> = [];

  private appId: string;
  private appCode: string;
  private currentUser: CurrentUser;

  public weather: any;

  public constructor(private http: HttpClient , private authService: AuthenticationService) {
    this.appId = "G3FPZ7gZn5VbCAuo3jiz";
    this.appCode = "lhVpg4SR_GwU3ZSges8ikA";
    this.weather = [];
  }

  public ngOnInit() {

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.getWeather(position.coords);
      });
    } else {
      console.error("The browser does not support geolocation...");
    }

    this.authService.getCurrentUser().subscribe(data => {

      this.currentUser = data as CurrentUser;
      this.roles =  this.currentUser.authorities;

    });

  }



  isAdmin(){
    for (let r of this.roles){
      if (r.authority == 'ADMIN'){return true;
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

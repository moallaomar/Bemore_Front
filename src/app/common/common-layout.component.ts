import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from '../Model/user_model';
import {CurrentUser} from '../Model/currentUser';
import {AuthenticationService} from '../Service/authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './common-layout.component.html'
})

export class CommonLayoutComponent implements OnInit {
  private roles: Array<any> = [];

  dataLoaded: any = 0;
  private user: User;
  private role: String;
  private currentUser: CurrentUser;
  public username : String;
  public app : any;
  public headerThemes: any;
  public changeHeader: any;
  public sidenavThemes: any;
  public changeSidenav: any;
  public headerSelected: any;
  public sidenavSelected : any;
  public searchActived : any;
  public searchModel: any;


  constructor(private route: Router, private authService: AuthenticationService) {
    this.app = {
      layout: {
        sidePanelOpen: false,
        isMenuOpened: true,
        isMenuCollapsed: false,
        themeConfigOpen: false,
        rtlActived: false,
        searchActived: false
      }
    };



    this.headerThemes = ['header-default', 'header-primary', 'header-info', 'header-success', 'header-danger', 'header-dark'];
    this.changeHeader = changeHeader;

    function changeHeader(headerTheme) {
      this.headerSelected = headerTheme;
    }

    this.sidenavThemes = ['sidenav-default', 'side-nav-dark'];
    this.changeSidenav = changeSidenav;

    function changeSidenav(sidenavTheme) {
      this.sidenavSelected = sidenavTheme;
    }
  }

  logOut(){
    localStorage.removeItem('token');
    this.currentUser = null;
    this.route.navigateByUrl('/login');

  }


  ngOnInit() {


    this.authService.getCurrentUser().subscribe(data => {

      this.currentUser = data as CurrentUser;
      this.roles =  this.currentUser.authorities;
      this.dataLoaded = 1;
      this.username = this.currentUser.name.toLowerCase();

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
}






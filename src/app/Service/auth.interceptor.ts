import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_token = localStorage.getItem('token');


    // Clone the request to add the new header.
    const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + access_token)});


    //send the newly created request
    return next.handle(authReq)
      .catch(err => {

        if (err instanceof HttpErrorResponse) {
          //    console.log(err.status);
          // console.log(err.statusText);
          if (err.status === 403) {
            this.router.navigateByUrl('/login');
          }
        }
        return Observable.toString();
      }) as any;
  }
}


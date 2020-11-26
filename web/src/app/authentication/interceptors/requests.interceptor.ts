import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class TokenRequestsInterceptor implements HttpInterceptor {

  constructor(private authSerivice: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const TOKEN = sessionStorage.getItem('token');
    
    if (TOKEN != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authSerivice.getToken()}`
        }
      });
  
      return next.handle(request);
    }
    else {
      return next.handle(request);    // Send normal request  
    }
  }
}

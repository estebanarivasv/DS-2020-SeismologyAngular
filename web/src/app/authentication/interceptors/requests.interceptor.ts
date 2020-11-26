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
export class RequestsInterceptor implements HttpInterceptor {

  constructor(private authSerivice: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (this.authSerivice.getToken() != null) {

      const TOKEN = this.authSerivice.getToken();

      // Add auth header
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + TOKEN) });
    }

    return next.handle(request);    // Dispatch request
  }
}

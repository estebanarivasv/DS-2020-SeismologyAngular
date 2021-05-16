import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AlertsService } from 'src/app/alerts';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root',

})
export class AuthGuardService implements CanActivate  {

  constructor(public authService: AuthenticationService, public router: Router, public alertService: AlertsService) {}

  // Lets or not get the route
  canActivate(): boolean {

   if (!this.authService.isAuthenticated) {
     this.router.navigate(['home']);
     this.alertService.error('Please log in to access this route')
     return false;
   }
   return true;
 }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertsService } from 'src/app/alerts';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public alertsService: AlertsService
  ) { }

  canActivate(): boolean {

    if (this.authService.isAuthenticated && this.authService.getAdmin()) {
      return true;
    }
    else {
      this.router.navigate(['home']);
      this.alertsService.error('You must log in with an authorized account.')
      return false;
    }
  }

}

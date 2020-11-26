import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertsService } from 'src/app/alerts';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router, private alertsService: AlertsService) { }

  /* canActivate()
  Controls whether a route can be activated. Interface that a class can implement to be a 
  guard deciding if a route can be activated. If all guards return true, navigation will 
  continue. If any guard returns false, navigation will be canceled.
  */

  // method that will run before each request to the router
  // check if the user is logged in and has a correct role

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const adminFromRoute = route.data.admin;
    const adminFromToken = sessionStorage.getItem('admin');

    if (!this.authService.isAuthenticated || adminFromToken !== adminFromRoute ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

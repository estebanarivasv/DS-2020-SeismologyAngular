import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root',

})
export class AuthGuardService implements CanActivate  {

  constructor(public authService: AuthenticationService, public router: Router) {}

  //Función que determina si una ruta puede o no navegarse
  canActivate(): boolean {
  //Verificar si el usuario está atuenticado
   if (!this.authService.isAuthenticated && this.authService.getAdmin()) {
     //Si no redireccionar a login
     this.router.navigate(['login']);
     
     //No se puede navegar
     return false;
   }
   //Se puede navegar
   return true;
 }
}

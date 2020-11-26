import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../alerts';
import { LoginModel } from './authentication.models';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  // TEMPLATE DRIVEN FORM
  email: string;
  password: string;
  admin: boolean;

  loginModel: LoginModel;

  userLogged: boolean;
  loginFailed: boolean;

  constructor(
    public authService: AuthenticationService,
    private router: Router, 
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    
    this.userLogged = this.authService.isAuthenticated;
    this.loginFailed = false;

    if (this.authService.getToken()) {
      this.admin = this.authService.getAdmin();
    }
  }

  signIn(): void {
    this.loginModel = new LoginModel(this.email, this.password);
    this.authService.logIn(this.loginModel).subscribe((data) => {

      this.userLogged = true;
      this.loginFailed = false;
      
      // Save request data to cookies
      this.authService.setToken(data.token);
      this.authService.setEmail(data.email);
      this.authService.setID(data.id);
      this.authService.setAdmin(data.admin);


      console.log(this.authService.getToken(),
      this.authService.getEmail(),
      this.authService.getID(),
      this.authService.getAdmin())
      
      this.admin = this.authService.getAdmin();
      if (this.admin) { this.router.navigate(['/users']); }
      else { this.router.navigate(['/unverified-seisms']); }

    },
      (err) => {
        console.log('Error de autenticación', err);
        this.alertsService.error('Error de autenticación')
      }
    );
  }

  signOut() {
    this.authService.logOut();
  }
}

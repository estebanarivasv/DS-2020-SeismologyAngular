import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  userAuthenticated: boolean;

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.userAuthenticated = this.authService.isAuthenticated;
  }
  signIn(): void {
    this.loginModel = new LoginModel(this.email, this.password);
    this.authService.logIn(this.loginModel).subscribe((data) => {      
      // Save request data to cookies
      this.authService.setToken(data.token);
      this.authService.setEmail(data.email);
      this.authService.setID(data.id);
      this.authService.setAdmin(data.admin);
      
      this.admin = this.authService.getAdmin();
      if (this.admin) { this.router.navigate(['/users']); }
      else { this.router.navigate(['/unverified-seisms']); }

      this.userAuthenticated = true;
      this.ngOnInit();
      

    },
      (err) => {
        console.log('Error de autenticación', err);
        this.ngOnInit();
      }
    );
  }

  signOut() {
    this.authService.logOut();

    this.userAuthenticated = false;
    this.ngOnInit();
  }
}

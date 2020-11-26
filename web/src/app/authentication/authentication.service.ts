import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { LoginModel, UserJWT } from './authentication.models';


const ID = 'idNum';
const TOKEN = 'token';
const EMAIL = 'email';
const ADMIN = 'admin';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public url = API_URL + 'auth/login';
  constructor(private http: HttpClient, private router: Router) { }

  logIn(loginModel: LoginModel): Observable<UserJWT> {
    return this.http.post<UserJWT>(this.url, loginModel);     // Sends form data to api
  }

  logOut() {
    window.sessionStorage.clear();          // Empty token
    this.router.navigate(['home']);         // Redirect to home
  }

  // USER IDENTIFICATION ON COOKIES


  setID(id: number): void {
    window.sessionStorage.removeItem(ID);
    window.sessionStorage.setItem(ID, String(id));
  }
  getID(): number {
    return parseInt(window.sessionStorage.getItem(ID));
  }


  setEmail(email: string): void {
    window.sessionStorage.removeItem(EMAIL);
    window.sessionStorage.setItem(EMAIL, email);
  }
  getEmail(): string {
    return window.sessionStorage.getItem(EMAIL);
  }


  setAdmin(admin: boolean): void {
    window.sessionStorage.removeItem(ADMIN);
    window.sessionStorage.setItem(ADMIN, String(admin));
  }
  getAdmin(): boolean {
    let admin = window.sessionStorage.getItem(ADMIN);
    if (Boolean(admin) == true) { return true; }
    else { return false; }
  }


  setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(TOKEN, token);
  }
  getToken(): string {
    return window.sessionStorage.getItem(TOKEN);
  }


  // 
  public get isAuthenticated(): boolean {
    return (sessionStorage.getItem('token') !== null);
  }

}

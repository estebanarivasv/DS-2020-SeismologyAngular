import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { UsersModel } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public url = API_URL + 'users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Array<UsersModel>> {
    return this.http.get<Array<UsersModel>>(this.url);
  }

  getAll(): Observable<Array<UsersModel>> {
    return this.http.get<Array<UsersModel>>(`${this.url}/filter`);
  }

  getOne(id: number): Observable<UsersModel> {
    return this.http.get<UsersModel>(`${this.url}/${id}`);
  }

  post(user: UsersModel): Observable<UsersModel> {
    return this.http.post<UsersModel>(this.url, user);
  }

  put(id: number, user: UsersModel): Observable<UsersModel> {
    return this.http.put<UsersModel>(`${this.url}/${id}`, user);
  }

  delete(id: number): Observable<UsersModel> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  private handleError(error: HttpErrorResponse | any) {
    return Observable.throw(error.message || 'Error: Unable to complete request.');
  }

}

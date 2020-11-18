import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeismsModel } from './seisms.model';
import { API_URL } from '../app.constants'

@Injectable({
  providedIn: 'root'
})
export class SeismsService {

  public url = API_URL + 'seisms';

  constructor(private http: HttpClient) { }

  getOneVerified(id: number): Observable<SeismsModel> {
    return this.http.get<SeismsModel>(`${this.url}/verified/${id}`);
  }

  getAllVerified(): Observable<Array<SeismsModel>> {
    return this.http.get<Array<SeismsModel>>(`${this.url}/verified/`);
  }

  putVerified(id: number, seism: SeismsModel): Observable<SeismsModel> {
    return this.http.put<SeismsModel>(`${this.url}/verified/${id}`, seism);
  }

  getOneUnverified(id: number): Observable<SeismsModel> {
    return this.http.get<SeismsModel>(`${this.url}/unverified/${id}`);
  }

  getAllUnverified(): Observable<Array<SeismsModel>> {
    return this.http.get<Array<SeismsModel>>(`${this.url}/unverified/`);
  }

  putUnverified(id: number, seism: SeismsModel): Observable<SeismsModel> {
    return this.http.put<SeismsModel>(`${this.url}/unverified/${id}`, seism);
  }

  deleteUnverified(id: number): Observable<SeismsModel> {
    return this.http.delete<SeismsModel>(`${this.url}/unverified/${id}`);
  }
}

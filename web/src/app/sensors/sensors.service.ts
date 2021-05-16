import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { SensorsModel } from './sensors.model';

@Injectable({
  providedIn: 'root'
})
  
export class SensorsService {
  
  public url = API_URL + 'sensors';

  constructor(private http: HttpClient) { }

  getOne(id: number): Observable<SensorsModel> {
    return this.http.get<SensorsModel>(`${this.url}/${id}`);
  }

  getAll(): Observable<Array<SensorsModel>> {
    return this.http.get<Array<SensorsModel>>(`${this.url}/filter`);
  }

  // TODO: finish status obtention from sensors
  getStatus() {}

  post(sensor: SensorsModel): Observable<SensorsModel> {
    return this.http.post<SensorsModel>(this.url, sensor);
  }

  put(id: number, sensor: SensorsModel): Observable<SensorsModel> {
    return this.http.put<SensorsModel>(`${this.url}/${id}`, sensor);
  }

  delete(id: number): Observable<SensorsModel> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  // Error handler
  private handleError(error: HttpErrorResponse | any) {
    return Observable.throw(error.message || 'Error: Unable to complete request.');
  }
}
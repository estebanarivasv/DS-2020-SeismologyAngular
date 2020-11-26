import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { SeismsDynamicModel } from '../seisms/seisms-filter.model';
import { SensorsModel, SensorsRequestModel } from './sensors.model';

@Injectable({
  providedIn: 'root'
})
  
export class SensorsService {
  
  public url = API_URL + 'sensors';

  constructor(private http: HttpClient) { }

  getOne(id: number): Observable<SensorsModel> {
    return this.http.get<SensorsModel>(`${this.url}/${id}`);
  }

  // Returns all sensors without pagination
  getAll(): Observable<Array<SensorsModel>> {
    return this.http.get<Array<SensorsModel>>(this.url);
  }

  // Returns sensors for the dynamic table
  getAllSensors(dynamicParams: SeismsDynamicModel): Observable<SensorsRequestModel> {
    return this.http.get<SensorsRequestModel>(this.url, {
      params: this.createRequestArgs(dynamicParams)
    });
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

  // This function returns the arguments for any request given some filter parameters
  createRequestArgs(dynamicParams: any) {
    let args: HttpParams = new HttpParams();

    // Verify if any parameter was given
    if (dynamicParams) {

      // Object.keys returns the key names from a dictionary
      // Stores the keys' values in each key from dynamicParams to args variable.
      Object.keys(dynamicParams).forEach(key => {
        args = dynamicParams[key] ? args.set(key, dynamicParams[key]) : args;
      });
    }
    return args;
  }
}
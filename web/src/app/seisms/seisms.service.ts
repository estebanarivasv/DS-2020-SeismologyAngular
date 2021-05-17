import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeismsModel, SeismsRequestModel } from './seisms.model';
import { API_URL } from '../app.constants'
import { SeismsDynamicModel } from './seisms-filter.model';

@Injectable({
  providedIn: 'root'
})
export class SeismsService {

  public url = API_URL + 'seisms';

  constructor(private http: HttpClient) { }

  getOneVerified(id: number): Observable<SeismsModel> {
    return this.http.get<SeismsModel>(`${this.url}/verified/${id}`);
  }

  getAllVerified(dynamicParams: SeismsDynamicModel): Observable<SeismsRequestModel> {
    return this.http.get<SeismsRequestModel>(`${this.url}/verified/`, {
      params: this.createRequestArgs(dynamicParams)
    }
      // We describe the filters as parameters in order to get the filtered table making
      // the HttpRequest. This function will send param as url args
    );
  }

  putVerified(id: number, seism: SeismsModel): Observable<SeismsModel> {
    return this.http.put<SeismsModel>(`${this.url}/verified/${id}`, seism);
  }

  getOneUnverified(id: number): Observable<SeismsModel> {
    return this.http.get<SeismsModel>(`${this.url}/unverified/${id}`);
  }

  getAllUnverified(dynamicParams: SeismsDynamicModel): Observable<SeismsRequestModel> {
    return this.http.get<SeismsRequestModel>(`${this.url}/unverified/`, {
      params: this.createRequestArgs(dynamicParams)
    }
      // We describe the filters as parameters in order to get the filtered table making
      // the HttpRequest. This function will send param as url args
    );
    
  }

  putUnverified(id: number, seism: SeismsModel): Observable<SeismsModel> {
    return this.http.put<SeismsModel>(`${this.url}/unverified/${id}`, seism);
  }

  deleteUnverified(id: number): Observable<SeismsModel> {
    return this.http.delete<SeismsModel>(`${this.url}/unverified/${id}`);
  }
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

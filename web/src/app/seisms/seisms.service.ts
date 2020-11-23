import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeismsModel } from './seisms.model';
import { API_URL } from '../app.constants'
import { VSeismsDynamicModel } from './verified-seisms/verified-seisms-filter.model';

// Encapsulated Seisms Array -> type: HttpResponse
// Observable<SeismsArrayResponse> == Observable<HttpResponse<Array<SeismsModel>>>
type SeismsArrayResponse = HttpResponse<Array<SeismsModel>>;

@Injectable({
  providedIn: 'root'
})
export class SeismsService {

  public url = API_URL + 'seisms';

  constructor(private http: HttpClient) { }

  getOneVerified(id: number): Observable<SeismsModel> {
    return this.http.get<SeismsModel>(`${this.url}/verified/${id}`);
  }

  getAllVerified(dynamicParams: VSeismsDynamicModel): Observable<SeismsArrayResponse> {
    return this.http.get<Array<SeismsModel>>(`${this.url}/verified/`, {

      /*
        We describe the filters as parameters in order to get the filtered table making
        the HttpRequest. This library won't send jsons in a get request.abs

        TODO: Modify api 
      */
      params: this.createRequestArgs(dynamicParams),
      observe: 'response'
    });
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

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CodeNameValue} from '../model/code-name-value';
import {environment} from '../../environments/environment';

@Injectable()
export class StatsService {

  constructor(private http: HttpClient) {}

  getTopTypes(filter: string): Observable<CodeNameValue[]> {
    return this.getNameValueStats('types', filter);
  }

  getTopAirlines(filter: string): Observable<CodeNameValue[]> {
    return this.getNameValueStats('airlines', filter);
  }

  getTopOrigins(filter: string): Observable<CodeNameValue[]> {
    return this.getNameValueStats('origins', filter);
  }

  getTopDestinations(filter: string): Observable<CodeNameValue[]> {
    return this.getNameValueStats('destinations', filter);
  }


  getNameValueStats(endpoint: string, filter: string): Observable<CodeNameValue[]> {
    let url = environment.apiUrl + 'stats/' + endpoint;
    url += filter ? '?' + filter : '';

    return this.http.get<CodeNameValue[]>(url);
  }

}

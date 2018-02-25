import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NameValue} from '../model/name-value';
import {environment} from '../../environments/environment';

@Injectable()
export class StatsService {

  constructor(private http: HttpClient) {}

  getTopAircrafts(filter: string): Observable<NameValue[]> {
    return this.getNameValueStats('aircrafts', filter);
  }

  getTopAirlines(filter: string): Observable<NameValue[]> {
    return this.getNameValueStats('airlines', filter);
  }

  getTopOrigins(filter: string): Observable<NameValue[]> {
    return this.getNameValueStats('origins', filter);
  }

  getTopDestinations(filter: string): Observable<NameValue[]> {
    return this.getNameValueStats('destinations', filter);
  }


  getNameValueStats(endpoint: string, filter: string): Observable<NameValue[]> {
    let url = environment.apiUrl + 'stats/' + endpoint;
    url += filter ? '?' + filter : '';

    return this.http.get<NameValue[]>(url);
  }

}

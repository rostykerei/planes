import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CodeNameValue} from '../model/code-name-value';
import {environment} from '../../environments/environment';
import {DateValue} from "../model/date-value";
import {PairValue} from "../model/pair-value";

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

  getFlights(filter: string): Observable<DateValue[]> {
    let url = environment.apiUrl + 'stats/flights';
    url += filter ? '?' + filter : '';

    return this.http.get<DateValue[]>(url);
  }

  getTopRoutes(filter: string): Observable<PairValue[]> {
    let url = environment.apiUrl + 'stats/routes';
    url += filter ? '?' + filter : '';

    return this.http.get<PairValue[]>(url);
  }
}

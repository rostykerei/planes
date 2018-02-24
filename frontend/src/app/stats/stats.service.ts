import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NameValue} from '../model/name-value';
import {environment} from '../../environments/environment';

@Injectable()
export class StatsService {

  constructor(private http: HttpClient) {}

  getTopAircrafts(filter: string): Observable<NameValue[]> {
    let url = environment.apiUrl + 'stats/aircrafts';
    url += filter ? '?' + filter : '';

    return this.http.get<NameValue[]>(url);
  }

  getTopAirlines(filter: string): Observable<NameValue[]> {
    let url = environment.apiUrl + 'stats/airlines';
    url += filter ? '?' + filter : '';

    return this.http.get<NameValue[]>(url);
  }

}

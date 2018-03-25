import {Injectable} from '@angular/core';
import {MapFlight} from './model/map-flight';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LngLat} from './model/lng-lat';
import 'rxjs/add/operator/map';

import {environment} from '../environments/environment';
import {FlightLog} from "./model/flight-log";

@Injectable()
export class FlightService {

  constructor(private http: HttpClient) {
  }

  getActiveFlights(): Observable<Map<number, MapFlight>> {
    return this.http
      .get(environment.apiUrl + 'map/active')
      .map((response: Response) => {
        const map = new Map();
        Object.keys(response).forEach(key => {
          const m = new MapFlight();
          Object.assign(m, response[key]);
          map.set(parseInt(key, 10), m);
        });

        return map;
      });
  }

  getFlightPath(id: number): Observable<LngLat[]> {
    return this.http.get<LngLat[]>(`${environment.apiUrl}map/path/${id}`);
  }

  getFlightDetails(id: number): Observable<any> {
    return this.http.get<LngLat[]>(`${environment.apiUrl}flights/${id}`);
  }

  getFlightLog(id: number): Observable<FlightLog[]> {
    return this.http.get<FlightLog[]>(`${environment.apiUrl}flights/${id}/log`);
  }

}

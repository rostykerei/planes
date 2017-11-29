import {Injectable} from '@angular/core';
import {MapFlight} from "./model/map-flight";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {LngLat} from "./model/lng-lat";

@Injectable()
export class MapService {

  constructor(private http: HttpClient) { }

  getActiveFlights(): Observable<MapFlight[]> {
    return this.http.get<MapFlight[]>("http://localhost:8080/map/active");
  }

  getFlightPath(id: number) : Observable<LngLat[]> {
    return this.http.get<LngLat[]>("http://localhost:8080/map/path/" + id);
  }

  getFlightDetails(id: number) : Observable<any> {
    return this.http.get<LngLat[]>("http://localhost:8080/map/details/" + id);
  }

}

import {Injectable} from '@angular/core';
import {MapFlight} from "./model/map-flight";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {LngLat} from "./model/lng-lat";
import "rxjs/add/operator/map";

@Injectable()
export class MapService {

  constructor(private http: HttpClient) { }

  getActiveFlights(): Observable<Map<number, MapFlight>> {
    return this.http
      .get("http://localhost:8080/map/active")
      .map((response: Response) => {
        const map = new Map();
        Object.keys(response).forEach(key => {
          let m = new MapFlight();
          Object.assign(m, response[key])
          map.set(key, m);
        });

        return map;
      });
  }

  getFlightPath(id: number) : Observable<LngLat[]> {
    return this.http.get<LngLat[]>("http://localhost:8080/map/path/" + id);
  }

  getFlightDetails(id: number) : Observable<any> {
    return this.http.get<LngLat[]>("http://localhost:8080/map/details/" + id);
  }

}

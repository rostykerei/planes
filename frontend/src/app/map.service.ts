import {Injectable} from '@angular/core';
import {MapFlight} from "./model/map-flight";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MapService {

  constructor(private http: HttpClient) { }

  getActiveFlights(): Observable<MapFlight[]> {
    return this.http.get<MapFlight[]>("http://localhost:8080/map/active");
  }

}

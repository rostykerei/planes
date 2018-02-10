import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {LngLat} from "./model/lng-lat";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AutocompleteService {

  constructor(private http: HttpClient) {}

  getAirports(q: string): Observable<any> {
    return this.http.get<LngLat[]>(environment.apiUrl + "filter/airports/" + q);
  }

}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NameValue} from "../model/name-value";
import {environment} from "../../environments/environment";

@Injectable()
export class StatsService {

  constructor(private http: HttpClient) {}

  getTopAircrafts(): Observable<NameValue[]> {
    return this.http.get<NameValue[]>(environment.apiUrl + "stats/aircrafts");
  }

}

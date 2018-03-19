import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {FlightsTable} from "../model/flights-table";

@Injectable()
export class FlightsService {

  constructor(private http: HttpClient) {
  }

  public getTable(filter: string, sort: string, order: string, page: number, pageSize: number): Observable<FlightsTable> {
    let url = environment.apiUrl + 'stats/table?';
    url += filter ? filter + '&' : '';
    url += sort ? 'sort=' + sort + '&' : '';
    url += order ? 'order=' + order + '&' : '';
    url += page ? 'page=' + page + '&' : '';
    url += pageSize ? 'size=' + pageSize + '&' : '';

    return this.http.get<FlightsTable>(url);
  }
}

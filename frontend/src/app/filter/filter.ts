import {Params} from "@angular/router/src/shared";
import {DatepickerUtils} from "./datepicker/datapicker-utils";
import {DateWrapper} from "./datepicker/datepicker.component";

export class Filter {
  dateFrom: DateWrapper;
  dateTo: DateWrapper;
  aircrafts: Set<string>;
  types: Set<string>;
  airlines: Set<string>;
  routes: Set<string>;
  origins: Set<string>;
  destinations: Set<string>;


  private constructor() {
  }

  public clear() : void {
    this.dateFrom = new DateWrapper();
    this.dateTo = new DateWrapper();;
    this.aircrafts = new Set<string>();
    this.types = new Set<string>();
    this.airlines = new Set<string>();
    this.routes = new Set<string>();
    this.origins = new Set<string>();
    this.destinations = new Set<string>();
  }

  public toQueryParams() : any {
    let q = {};

    if (this.dateFrom.date != null) {
      q['dateFrom'] = DatepickerUtils.toString(this.dateFrom.date);
    }

    if (this.dateTo.date != null) {
      q['dateTo'] = DatepickerUtils.toString(this.dateTo.date);
    }

    if (this.aircrafts.size > 0) {
      q['aircrafts'] = Array.from(this.aircrafts.values());
    }

    if (this.types.size > 0) {
      q['types'] = Array.from(this.types.values());
    }

    if (this.airlines.size > 0) {
      q['airlines'] = Array.from(this.airlines.values());
    }

    if (this.routes.size > 0) {
      q['routes'] = Array.from(this.routes.values());
    }

    if (this.aircrafts.size > 0) {
      q['aircrafts'] = Array.from(this.aircrafts.values());
    }

    if (this.origins.size > 0) {
      q['origins'] = Array.from(this.origins.values());
    }

    if (this.destinations.size > 0) {
      q['destinations'] = Array.from(this.destinations.values());
    }

    return q;
  }

  public toQueryString() : string {
    let params = this.toQueryParams();
    let q = '';

    for (let key in params) {
      let value = params[key];

      if (value instanceof Array) {
        value.forEach(v => q += '&' + key + '=' + encodeURI(v));
      }
      else {
        q += '&' + key + '=' + encodeURI(value);
      }
    }

    return q.length > 1 ? q.substring(1) : '';
  }

  public static fromQueryParams(params: Params): Filter {
    let filter: Filter = new Filter();

    filter.dateFrom = this.toDateWrapper('dateFrom', params);
    filter.dateTo = this.toDateWrapper('dateTo', params);
    filter.aircrafts = this.toSet('aircrafts', params);
    filter.types = this.toSet('types', params);
    filter.airlines = this.toSet('airlines', params);
    filter.routes = this.toSet('routes', params);
    filter.origins = this.toSet('origins', params);
    filter.destinations = this.toSet('destinations', params);

    return filter;
  }

  private static toSet(name: string, params: Params): Set<string> {
    let result: Set<string> = new Set();

    if (params.hasOwnProperty(name)) {
      if (params[name] instanceof Array) {
        params[name].forEach(a => result.add(a));
      }
      else {
        result.add(params[name]);
      }
    }

    return result;
  }

  private static toDateWrapper(name: string, params: Params): DateWrapper {
    let result: DateWrapper = new DateWrapper();

    if (params.hasOwnProperty(name) && DatepickerUtils.isValid(params[name])) {
      result.date = DatepickerUtils.toDate(params[name]);
    }

    return result;
  }
}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Filter} from "./filter";
import {DatepickerUtils} from "./datepicker/datapicker-utils";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() onChange: EventEmitter<Filter> = new EventEmitter();
  @Output() onReady: EventEmitter<Filter> = new EventEmitter();

  state: Filter = new Filter();

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  dateFrom: string = null;
  dateTo: string = null;
  aircrafts: Set<string> = new Set<string>();
  types: Set<string> = new Set<string>();
  airlines: Set<string> = new Set<string>();
  routes: Set<string> = new Set<string>();
  origins: Set<string> = new Set<string>();
  destinations: Set<string> = new Set<string>();

  ngOnInit() {
    this.dateFrom = this.setDateField('dateFrom');
    this.dateTo = this.setDateField('dateTo');
    this.setFilterField(this.aircrafts, 'aircrafts');
    this.setFilterField(this.types, 'types');
    this.setFilterField(this.airlines, 'airlines');
    this.setFilterField(this.routes, 'routes');
    this.setFilterField(this.origins, 'origins');
    this.setFilterField(this.destinations, 'destinations');

    this.onReady.emit(this.state);
  }

  changeDate(field: string, value: string) {
    let queryParams = {};
    queryParams[field] = value;
    this.state[field] = value;

    this.applyChange(queryParams);
  }

  change(field: string, value: Set<string>) {
    let queryParams = {};
    let values: string[] = Array.from(value.values());

    queryParams[field] = values;
    this.state[field] = values;

    this.applyChange(queryParams);
  }

  private applyChange(queryParams: any) {
    this.router.navigate([], {
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    );

    this.onChange.emit(this.state);
  }

  private setDateField(name: string): string {
    let query = this.route.snapshot.queryParams;

    if (query.hasOwnProperty(name)) {
      if (DatepickerUtils.isValid(query[name])) {
        this.state[name] = query[name];
        return query[name];
      }
    }

    return null;
  }

  private setFilterField(field: Set<string>, name: string): void {
    let query = this.route.snapshot.queryParams;

    if (query.hasOwnProperty(name)) {
      if (query[name] instanceof Array) {
        query[name].forEach(a => {
          field.add(a);
        });

        this.state[name] = query[name];
      }
      else {
        field.add(query[name]);
        this.state[name] = [query[name]];
      }
    }
  }
}

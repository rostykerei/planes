import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Filter} from "./filter";

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

  aircrafts: Set<string> = new Set<string>();
  types: Set<string> = new Set<string>();
  airlines: Set<string> = new Set<string>();
  routes: Set<string> = new Set<string>();
  origins: Set<string> = new Set<string>();
  destinations: Set<string> = new Set<string>();

  ngOnInit() {
    this.setFilterField(this.aircrafts, 'aircrafts');
    this.setFilterField(this.types, 'types');
    this.setFilterField(this.airlines, 'airlines');
    this.setFilterField(this.routes, 'routes');
    this.setFilterField(this.origins, 'origins');
    this.setFilterField(this.destinations, 'destinations');

    this.onReady.emit(this.state);
  }

  change(field: string, value: Set<string>) {
    let queryParams = {};
    queryParams[field] = Array.from(value.values());

    this.router.navigate([], {
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      }
    );

    this.state[field] = queryParams[field];
    this.onChange.emit(this.state);
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

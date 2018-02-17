import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-flights-filter',
  templateUrl: './flights-filter.component.html',
  styleUrls: ['./flights-filter.component.scss']
})
export class FlightsFilterComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
  }

  change(field: string, value: Set<string>) {
    let queryParams = {};
    queryParams[field] = Array.from(value.values());

    this.router.navigate([], { queryParams: queryParams, queryParamsHandling: 'merge' });
  }
}

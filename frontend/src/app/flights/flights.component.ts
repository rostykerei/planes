import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {switchMap} from 'rxjs/operators/switchMap';
import {Filter} from "../filter/filter";
import {FlightsService} from "./flights.service";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  displayedColumns = ['id', 'callsign', 'airline', 'from', 'to', 'aircraft', 'type', 'date'];

  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterQueryString = '';
  onFilterChange: EventEmitter<Filter> = new EventEmitter();

  constructor(private flightsService: FlightsService) {
  }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.onFilterChange)
      .pipe(
        switchMap(() => {
          this.isLoadingResults = true;

          return this.flightsService.getTable(this.filterQueryString,
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.total;

          return data.table;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  filterChange(event: Filter) {
    this.paginator.pageIndex = 0;
    this.filterQueryString = event.toQueryString();
    this.onFilterChange.emit(event);
  }
}

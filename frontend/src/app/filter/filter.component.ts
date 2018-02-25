import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Filter} from './filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() goButtonIcon: string;
  @Input() goButtonText: string;
  @Input() goButtonLink: string;

  @Output() onChange: EventEmitter<Filter> = new EventEmitter();
  @Output() onReady: EventEmitter<Filter> = new EventEmitter();

  model: Filter;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.model = Filter.fromQueryParams(this.route.snapshot.queryParams);
    this.onReady.emit(this.model);
  }

  change() {
    this.router.navigate([], {
        queryParams: this.model.toQueryParams(),
      }
    );

    this.onChange.emit(this.model);
  }

  clear(): void {
    this.router.navigate([], {
        queryParams: {}
      }
    );

    this.model.clear();
    this.onChange.emit(this.model);
  }

  go(): void {
    this.router.navigate([this.goButtonLink], {
        queryParams: this.model.toQueryParams(),
      }
    );
  }



}

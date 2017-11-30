import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.scss']
})
export class DashboardDetailsComponent implements OnInit {

  @Input() details: any;
  @Input() flights: any;

  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closeClick() {
    this.close.emit(null);
  }
}

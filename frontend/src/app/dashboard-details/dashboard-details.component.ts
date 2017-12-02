import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MapFlight} from "../model/map-flight";

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.scss']
})
export class DashboardDetailsComponent implements OnInit {

  @Input() details: any;
  @Input() flight: MapFlight;

  callsign: string;
  routeNumber: string;

  airlineName: string;

  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.callsign = 'UNKNOWN';

    let route = this.details.route;

    if (route) {
      this.callsign = route.callsign;
      this.routeNumber = route.number;

      if (route.airline) {
        this.airlineName = route.airline.name;
      }

    }
  }

  closeClick() {
    this.close.emit(null);
  }
}

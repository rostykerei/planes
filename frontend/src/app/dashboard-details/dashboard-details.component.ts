import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  airportFromCode: string;
  airportToCode: string;

  airportFromCity: string;
  airportToCity: string;

  airlineCode: string;
  airlineName: string;

  aircraftType: string;

  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.callsign = 'UNKNOWN';

    let route = this.details.route;
    let aircraft = this.details.aircraft;

    if (route) {
      this.callsign = route.callsign;
      this.routeNumber = route.number;

      if (route.airline) {
        this.airlineName = route.airline.name;
        this.airlineCode = route.airline.code;
      }

      if (route.airportFrom) {
        this.airportFromCode = route.airportFrom.code;
        this.airportFromCity = route.airportFrom.city;
      }

      if (route.airportTo) {
        this.airportToCode = route.airportTo.code;
        this.airportToCity = route.airportTo.city;
      }
    }

    if (aircraft) {
      if (aircraft.type) {
        this.aircraftType = aircraft.type.type;
      }

    }
  }

  closeClick() {
    this.close.emit(null);
  }
}

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MapFlight} from "../model/map-flight";

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.scss']
})
export class DashboardDetailsComponent implements OnChanges {


  @Input() details: any;
  @Input() flight: MapFlight;

  callsign: string;
  routeNumber: string;

  airportFromCode: string;
  airportToCode: string;

  airportFromCity: string;
  airportToCity: string;

  airportFromCountry: any;
  airportToCountry;

  airlineCode: string;
  airlineName: string;

  aircraftType: string;
  aircraftModel: string;

  @Output() close = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
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
        this.airportFromCountry = route.airportFrom.country;
      }

      if (route.airportTo) {
        this.airportToCode = route.airportTo.code;
        this.airportToCity = route.airportTo.city;
        this.airportToCountry = route.airportTo.country;
      }
    }

    if (aircraft) {
      if (aircraft.type) {
        this.aircraftType = aircraft.type.type;
      }

      this.aircraftModel = aircraft.model;
    }
  }

  closeClick() {
    this.close.emit(null);
  }
}

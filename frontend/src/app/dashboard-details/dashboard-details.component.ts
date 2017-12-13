import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MapFlight} from "../model/map-flight";
import {DashboardUtils} from "../dashboard/dashboard-utils";
import {environment} from "../../environments/environment";

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
  airportFromIata: string;
  airportFromName: string;
  airportFromCity: string;
  airportFromCountry: any;

  airportToCode: string;
  airportToIata: string;
  airportToName: string;
  airportToCity: string;
  airportToCountry: any;

  aircraftType: string;
  aircraftModel: string;
  aircraftRegistration: string;

  airlineCode: string;
  airlineName: string;
  airlineOperatedBy: string;

  distance: number;

  @Output() close = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.hasOwnProperty('details')) {
      this.cleanDetails();
      this.updateRoute();
      this.updateAircraft();
      this.updateAirline();
    }

    if (changes.hasOwnProperty('flight')) {
      if (this.flight.lat && this.flight.lon) {
        this.distance = DashboardUtils.distance(
          environment.mapStartLat, environment.mapStartLon,
          this.flight);
      }
      else {
        this.distance = null;
      }
    }


  }

  closeClick() {
    this.close.emit(null);
  }

  private cleanDetails(): void {
    this.callsign = null;
    this.routeNumber = null;

    this.airportFromCode = null;
    this.airportFromIata = null;
    this.airportFromName = null;
    this.airportFromCity = null;
    this.airportFromCountry = null;

    this.airportToCode = null;
    this.airportToIata = null;
    this.airportToName = null;
    this.airportToCity = null;
    this.airportToCountry = null;

    this.aircraftType = null;
    this.aircraftModel = null;
    this.aircraftRegistration = null;

    this.airlineCode = null;
    this.airlineName = null;
    this.airlineOperatedBy = null;
  }

  private updateRoute(): void {
    let route = this.details.route;

    if (route) {
      this.callsign = route.callsign;
      this.routeNumber = route.number;

      if (route.airportFrom) {
        this.airportFromCode = route.airportFrom.code;
        this.airportFromIata = route.airportFrom.iataCode;
        this.airportFromName = route.airportFrom.name;
        this.airportFromCity = route.airportFrom.city;
        this.airportFromCountry = route.airportFrom.country;
      }

      if (route.airportTo) {
        this.airportToCode = route.airportTo.code;
        this.airportToIata = route.airportTo.iataCode;
        this.airportToName = route.airportTo.name;
        this.airportToCity = route.airportTo.city;
        this.airportToCountry = route.airportTo.country;
      }
    }
  }

  private updateAircraft(): void {
    let aircraft = this.details.aircraft;

    if (aircraft) {
      if (aircraft.model) {
        this.aircraftModel = aircraft.model;
      }

      if (aircraft.type) {
        this.aircraftType = aircraft.type.type;

        if (!this.aircraftModel) {
          this.aircraftModel = aircraft.type.manufacturer || '';
          this.aircraftModel += ' ';
          this.aircraftModel += aircraft.type.model || '';
        }
      }

      this.aircraftRegistration = aircraft.registration;
    }
  }

  private updateAirline(): void {
    let route = this.details.route;

    if (route && route.airline) {
      this.airlineName = route.airline.name;
      this.airlineCode = route.airline.code;

      if (this.airlineCode
        && this.details.aircraft
        && this.details.aircraft.airline
        && this.details.aircraft.airline.code
        && this.airlineCode != this.details.aircraft.airline.code) {
        this.airlineOperatedBy = this.details.aircraft.airline.name;
      }
    }
  }
}

import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from "../map.service";
import {MapFlight} from "../model/map-flight";
import {LngLat} from "../model/lng-lat";
import {DashboardUtils} from "./dashboard-utils";
import {environment} from "../../environments/environment";
import {StompService} from "@stomp/ng2-stompjs";
import {ISubscription} from "rxjs/Subscription";

declare const google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  public static readonly CLIENT_UPDATE_INTERVAL: number = 500;
  public static readonly FLIGHT_MAX_AGE: number = 60000;

  static readonly DATA: string = 'data';

  map: any;
  markers: Map<number, any> = new Map();

  drawnPath: any[] = [];

  path: any;

  clientUpdateTimer: any;
  stompSubscription: ISubscription;

  details: any;
  activeFlight: MapFlight;

  constructor(private mapService: MapService, private stompService: StompService) {

  }

  ngOnInit(): void {
    this.clientUpdateTimer = setInterval(() => this.updateFlights(), DashboardComponent.CLIENT_UPDATE_INTERVAL);

    this.stompSubscription = this.stompService
      .subscribe('/topic/flight')
      .map((message: any) => JSON.parse(message.body))
      .subscribe((f: MapFlight) => {
        if ((f.lat && f.lon) && (f.age < DashboardComponent.FLIGHT_MAX_AGE)) {
          this.updateFlight(f);
        }
      });

    this.mapService.getActiveFlights().subscribe(f => this.flightsPreLoaded(f));
  }

  flightsPreLoaded(flights: Map<number, MapFlight>): void {
    flights.forEach((f, id) => {
      if ((f.lat && f.lon) && (f.age < DashboardComponent.FLIGHT_MAX_AGE)) {
        this.updateFlight(f);
      }
    });
  }

  ngAfterViewInit(): void {
    let mapProp = {
      center: new google.maps.LatLng(environment.mapStartLat, environment.mapStartLon),
      zoom: environment.mapStartZoom,
      mapTypeId: environment.mapTypeId,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
      }
    };

    this.map = new google.maps.Map(document.getElementById("map"), mapProp);

    this.map.addListener('click', () => {
      this.details = null;
      this.activeFlight = null;

      if (this.path) {
        this.path.setMap(null);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.clientUpdateTimer) {
      clearInterval(this.clientUpdateTimer);
    }

    if (this.stompSubscription) {
      this.stompSubscription.unsubscribe();
    }
  }

  updateFlight(f: MapFlight): void {
    let id: number = f.id;
    let marker: any;

    if (this.markers.has(id)) {
      marker = this.markers.get(id);

      marker.setPosition({lat: f.lat, lng: f.lon});
      marker.setIcon(DashboardUtils.getIcon(f));

      // Update path
      if (this.path && this.activeFlight && this.activeFlight.id == id) {
        this.drawnPath.push({lat: f.lat, lng: f.lon});
        this.path.setPath(this.drawnPath);
      }
    }
    else {
      marker = new google.maps.Marker({
        map: this.map,
        position: {lat: f.lat, lng: f.lon},
        icon: DashboardUtils.getIcon(f)
      });

      marker.addListener('click', () => {
        this.map.panTo(marker.getPosition());
        this.activeFlight = marker.get(DashboardComponent.DATA);

        this.loadPath(id);
        this.loadDetails(id);
      });

      let infowindow = new google.maps.InfoWindow({
        maxWidth: 65
      });

      marker.addListener('mouseover', () => {
        infowindow.setContent(
          DashboardUtils.formatPopup(
            marker.get(DashboardComponent.DATA)
          )
        );

        infowindow.open(this.map, marker);
      });

      marker.addListener('mouseout', () => infowindow.close());

      this.markers.set(id, marker);
    }

    marker.set(DashboardComponent.DATA, f);
  }


  loadPath(id: number): void {
    this.mapService.getFlightPath(id).subscribe(path => this.pathLoaded(id, path));
  }

  pathLoaded(id: number, path: LngLat[]): void {
    this.drawnPath = [];

    path.forEach(p => this.drawnPath.push({lat: p.lat, lng: p.lon}));

    if (this.path) {
      this.path.setMap(null);
      this.path = null;
    }

    this.path = new google.maps.Polyline({
      path: this.drawnPath,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    this.path.setMap(this.map);
  }

  loadDetails(id: number): void {
    this.mapService.getFlightDetails(id).subscribe(details => this.detailsLoaded(id, details));
  }

  detailsLoaded(id: number, details: any): void {
    this.details = details;
  }

  closeDetails(): void {
    this.details = null;
    this.drawnPath = [];
    this.activeFlight = null;

    if (this.path) {
      this.path.setMap(null);
    }
  }

  private updateFlights(): void {
    this.markers.forEach((marker) => {
      let data: MapFlight = marker.get(DashboardComponent.DATA);
      data.age += DashboardComponent.CLIENT_UPDATE_INTERVAL;

      // remove stale flights
      if (data.age > DashboardComponent.FLIGHT_MAX_AGE) {
        if (this.activeFlight && this.activeFlight.id == data.id) {
          this.activeFlight = null;

          if (this.path) {
            this.path.setMap(null);
          }
        }

        marker.setMap(null);
        this.markers.delete(data.id);
        return;
      }

      if (data.lon && data.lon && data.speed && data.heading) {
        data = DashboardUtils.updatePosition(data, DashboardComponent.CLIENT_UPDATE_INTERVAL);
        marker.setPosition({lat: data.lat, lng: data.lon});
      }

      marker.set(DashboardComponent.DATA, data);

      if (this.activeFlight && this.activeFlight.id == data.id) {
        this.activeFlight = data;
      }
    });
  }
}

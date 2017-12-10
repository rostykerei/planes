import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {MapService} from "../map.service";
import {MapFlight} from "../model/map-flight";
import {LngLat} from "../model/lng-lat";
import {DashboardUtils} from "./dashboard-utils";

declare const google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {

  public static readonly SERVER_UPDATE_INTERVAL: number = 5000;
  public static readonly CLIENT_UPDATE_INTERVAL: number = 500;

  static readonly DATA: string = 'data';

  map: any;
  markers: Map<number, any> = new Map();
  flights: Map<number, MapFlight> = new Map();

  drawnFlight: number;
  drawnPath: any[] = [];

  path: any;

  serverUpdateTimer: any;
  clientUpdateTimer: any;

  activeFlight: MapFlight;
  details: any;

  constructor(private mapService: MapService) {
  }

  ngAfterViewInit(): void {
    let mapProp = {
      center: new google.maps.LatLng(52.308056, 4.764167),
      zoom: 7,
      mapTypeId: 'terrain'
    };

    this.map = new google.maps.Map(document.getElementById("map"), mapProp);

    this.map.addListener('click', () => {
      this.details = null;
      if (this.path) {
        this.path.setMap(null);
      }
    });

    this.loadFlights();

    this.serverUpdateTimer = setInterval(() => this.loadFlights(), DashboardComponent.SERVER_UPDATE_INTERVAL);
    this.clientUpdateTimer = setInterval(() => this.updateFlights(), DashboardComponent.CLIENT_UPDATE_INTERVAL);
  }

  ngOnDestroy(): void {
    if (this.serverUpdateTimer) {
      clearInterval(this.serverUpdateTimer);
    }

    if (this.clientUpdateTimer) {
      clearInterval(this.clientUpdateTimer);
    }
  }

  flightsLoaded(flights: Map<number, MapFlight>) {
    // Remove disappeared
    this.flights.forEach((f, id) => {
      if (!flights.has(id)) {
        this.flights.delete(id);

        if (id == this.drawnFlight && this.path) {
          this.path.setMap(null);
        }

        if (this.markers.has(id)) {
          this.markers.get(id).setMap(null);
          this.markers.delete(id);
        }
      }
    });

    flights.forEach((f, id) => {
      if ((!this.flights.has(id) || f.age <= DashboardComponent.SERVER_UPDATE_INTERVAL) && (f.lat && f.lon)) {
        this.flights.set(id, f);
      }
    });

    this.updateMap();
  }

  updateMap(): void {
    this.flights.forEach((f: MapFlight, id: number) => this.updateFlight(f));
  }

  updateFlight(f: MapFlight): void {
    let id: number = f.id;

    if (this.markers.has(f.id)) {
      let m = this.markers.get(id);
      m.setPosition({lat: f.lat, lng: f.lon});
      m.setIcon({
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 3,
        fillColor: "red",
        fillOpacity: 0.8,
        strokeWeight: 1,
        rotation: f.heading
      });

      if (id == this.drawnFlight && this.path) {
        this.drawnPath.push({lat: f.lat, lng: f.lon});
        this.path.setPath(this.drawnPath);
      }
    }
    else {
      let marker = new google.maps.Marker({
        map: this.map,
        position: {lat: f.lat, lng: f.lon},
        icon: {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 3,
          fillColor: "red",
          fillOpacity: 0.8,
          strokeWeight: 1,
          rotation: f.heading
        }
      });

      marker.set(DashboardComponent.DATA, f);

      marker.addListener('click', () => {
          this.map.panTo(marker.getPosition());
          this.activeFlight = this.flights.get(id);
          this.loadPath(id);
          this.loadDetails(id);
      });

      let infowindow = new google.maps.InfoWindow({
        maxWidth: 200
      });

      marker.addListener('mouseover', () => {
        infowindow.setContent(
          DashboardUtils.formatPopup(
            this.markers.get(id).get(DashboardComponent.DATA)
          )
        );

        infowindow.open(this.map, marker);
      });

      marker.addListener('mouseout', () => {
        infowindow.close();
      });

      this.markers.set(f.id, marker);
    }

    if (this.activeFlight && this.activeFlight.id == f.id) {
      this.activeFlight = f;
    }
  }


  loadFlights(): void {
    this.mapService.getActiveFlights().subscribe(f => this.flightsLoaded(f));
  }

  loadPath(id: number): void {
    this.mapService.getFlightPath(id).subscribe(path => this.pathLoaded(id, path));
  }

  pathLoaded(id: number, path: LngLat[]) {
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
    this.drawnFlight = id;
  }

  loadDetails(id: number): void {
    this.mapService.getFlightDetails(id).subscribe(details => this.detailsLoaded(id, details));
  }

  detailsLoaded(id: number, details: any): void {
    this.details = details;
  }

  closeDetails() {
    this.details = null;
    this.drawnPath = [];
    this.drawnFlight = null;

    if (this.path) {
      this.path.setMap(null);
    }
  }

  private updateFlights() {
    this.flights.forEach((f, id, map) => {
      if (f.lon && f.lon && f.speed && f.heading) {
        let newF : MapFlight = DashboardUtils.updatePosition(f, DashboardComponent.CLIENT_UPDATE_INTERVAL);
        map.set(id, newF);

        if (this.activeFlight && this.activeFlight.id == f.id) {
          this.activeFlight = f;
        }

        this.markers.get(f.id).setPosition({lat: newF.lat, lng: newF.lon});
      }
    });
  }
}

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

  drawnFlight: number;
  drawnPath: any[] = [];

  path: any;

  serverUpdateTimer: any;
  clientUpdateTimer: any;

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

  flightsLoaded(flights: Map<number, MapFlight>): void {
    // Remove disappeared
    this.markers.forEach((marker, id) => {
      if (!flights.has(id)) {
        if (id == this.drawnFlight && this.path) {
          this.path.setMap(null);
        }

        marker.setMap(null);
        this.markers.delete(id);
      }
    });

    flights.forEach((f, id) => {
      if ((!this.markers.has(id) || f.age <= DashboardComponent.SERVER_UPDATE_INTERVAL) && (f.lat && f.lon)) {
        this.updateFlight(f);
      }
    });
  }

  updateFlight(f: MapFlight): void {
    let id: number = f.id;
    let marker: any;

    if (this.markers.has(id)) {
      marker = this.markers.get(id);

      marker.setPosition({lat: f.lat, lng: f.lon});
      marker.setIcon({
        path: "m 32,61 -1,-1 -9,2 -2,1 0,-2 9,-6 1,-1 -1,-9 0,-11 -7,0 -1,1 0,-1 -3,1 -1,1 0,-1 -3,1 -9,3 -1,1 0,-2 1,-2 17,-9 1,-1 -1,-2 0,-3 1,-1 2,0 1,1 0,3 3,-2 0,-13 1,-5 1,-3 1,-1 1,1 1,3 1,5 0,13 3,2 0,-3 1,-1 2,0 1,1 0,3 -1,2 1,1 17,9 1,2 0,2 -1,-1 -9,-3 -3,-1 0,1 -1,-1 -3,-1 0,1 -1,-1 -7,0 0,11 -1,9 1,1 9,6 0,2 -2,-1 -9,-2 -1,1 z",
        anchor: new google.maps.Point(32, 32),
        scale: 0.63 * 0.75,
        fillColor: "orange",
        fillOpacity: 0.8,
        strokeWeight: 1,
        rotation: f.heading
      });

      // Update path
      if (this.path && id == this.drawnFlight) {
        this.drawnPath.push({lat: f.lat, lng: f.lon});
        this.path.setPath(this.drawnPath);
      }
    }
    else {
      marker = new google.maps.Marker({
        map: this.map,
        position: {lat: f.lat, lng: f.lon},
        icon: {
          path: "m 32,61 -1,-1 -9,2 -2,1 0,-2 9,-6 1,-1 -1,-9 0,-11 -7,0 -1,1 0,-1 -3,1 -1,1 0,-1 -3,1 -9,3 -1,1 0,-2 1,-2 17,-9 1,-1 -1,-2 0,-3 1,-1 2,0 1,1 0,3 3,-2 0,-13 1,-5 1,-3 1,-1 1,1 1,3 1,5 0,13 3,2 0,-3 1,-1 2,0 1,1 0,3 -1,2 1,1 17,9 1,2 0,2 -1,-1 -9,-3 -3,-1 0,1 -1,-1 -3,-1 0,1 -1,-1 -7,0 0,11 -1,9 1,1 9,6 0,2 -2,-1 -9,-2 -1,1 z",
          anchor: new google.maps.Point(32, 32),
          scale: 0.63 * 0.75,
          fillColor: "orange",
          fillOpacity: 0.8,
          strokeWeight: 1,
          rotation: f.heading
        }
      });

      marker.addListener('click', () => {
          this.map.panTo(marker.getPosition());
          this.loadPath(id);
          this.loadDetails(id);
      });

      let infowindow = new google.maps.InfoWindow({
        maxWidth: 200
      });

      marker.addListener('mouseover', () => {
        infowindow.setContent(
          DashboardUtils.formatPopup(
            marker.get(DashboardComponent.DATA)
          )
        );

        infowindow.open(this.map, marker);
      });

      marker.addListener('mouseout', () => {
        infowindow.close();
      });

      this.markers.set(id, marker);
    }

    marker.set(DashboardComponent.DATA, f);
  }


  loadFlights(): void {
    this.mapService.getActiveFlights().subscribe(f => this.flightsLoaded(f));
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
    this.drawnFlight = id;
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
    this.drawnFlight = null;

    if (this.path) {
      this.path.setMap(null);
    }
  }

  private updateFlights(): void {
    this.markers.forEach((marker) => {
      let data = marker.get(DashboardComponent.DATA);

      if (data.lon && data.lon && data.speed && data.heading) {
        let newData : MapFlight = DashboardUtils.updatePosition(data, DashboardComponent.CLIENT_UPDATE_INTERVAL);
        marker.set(DashboardComponent.DATA, newData);
        marker.setPosition({lat: newData.lat, lng: newData.lon});
      }
    });
  }
}

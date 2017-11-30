import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {MapService} from "../map.service";
import {MapFlight} from "../model/map-flight";
import {LngLat} from "../model/lng-lat";
import {DashboardUtils} from "./dashboard-utils";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {

  public static readonly SERVER_UPDATE_INTERVAL: number = 5000;
  public static readonly CLIENT_UPDATE_INTERVAL: number = 250;

  map: mapboxgl.Map;
  popup: mapboxgl.Popup;

  flights: Map<number, MapFlight> = new Map();

  drawnFlight: number;
  drawnPath: any[] = [];

  serverUpdateTimer: any;
  clientUpdateTimer: any;

  details: any;

  constructor(private mapService: MapService) {
    this.popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
  }

  ngAfterViewInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9zdHlrZXJlaSIsImEiOiJjaXVpdXk1enowMDNwMnlwcjFicTgyZG5jIn0.JFWHhjOLeynWdzP-Xyojww';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/basic-v9',
      zoom: 7,
      center: [4.764167, 52.308056]
    });

    this.map.on('load', () => {
      this.loadFlights();
      this.serverUpdateTimer = setInterval(() => this.loadFlights(), DashboardComponent.SERVER_UPDATE_INTERVAL);
      this.clientUpdateTimer = setInterval(() => this.updateFlights(), DashboardComponent.CLIENT_UPDATE_INTERVAL);
    });

    this.map.on('click', () => {
      if (this.map.getSource('path')) {
        this.drawnPath = [];
        this.map.removeLayer('path');
        this.map.removeSource('path');
      }

      this.details = null;
    });
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

        if (id == this.drawnFlight) {
          this.drawnPath = [];
          this.map.removeLayer('path');
          this.map.removeSource('path');
        }

        this.map.removeLayer('f' + id);
        this.map.removeSource('f' + id);
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

  updateFlight(f: MapFlight, skipPath?: boolean): void {
    if (this.map.getSource("f" + f.id)) {

      this.map.getSource("f" + f.id).setData({
        "type": "Point",
        "coordinates": [f.lon, f.lat]
      });

      this.map.setLayoutProperty("f" + f.id, 'icon-rotate', f.heading || 0);

      if (!skipPath && f.id == this.drawnFlight) {
        if (f.lat && f.lon) {
          this.map.panTo([f.lon, f.lat]);
          this.drawnPath.push([f.lon, f.lat]);

          this.map.getSource("path").setData({
            "type": "LineString",
            "coordinates": this.drawnPath
          });
        }
      }
    }
    else {
      this.map.addSource("f" + f.id, DashboardUtils.mapboxAircraftSource(f));
      this.map.addLayer(DashboardUtils.mapboxAircraftLayer(f));

      this.map.on('click', "f" + f.id, (e) => {
        let id: number = parseInt(e.features[0].layer.id.substring(1));
        this.map.flyTo({center: e.lngLat});

        this.loadPath(id);
        this.loadDetails(id);
      });

      this.map.on('mouseenter', "f" + f.id, (e) => {
        let id: number = parseInt(e.features[0].layer.id.substring(1));

        this.map.getCanvas().style.cursor = 'pointer';
        this.popup.setLngLat(e.lngLat)
          .setHTML(DashboardUtils.formatPopup(this.flights.get(id)))
          .addTo(this.map);
      });

      this.map.on('mouseleave', "f" + f.id, () => {
        this.map.getCanvas().style.cursor = '';
        this.popup.remove();
      });
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

    path.forEach(p => this.drawnPath.push([p.lon, p.lat]));

    if (this.map.getLayer("path")) {
      this.map.removeLayer("path");
      this.map.removeSource("path");
    }

    this.map.addSource("path", {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": this.drawnPath
        }
      }
    });

    this.map.addLayer(DashboardUtils.mapboxPathLayer());

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

    if (this.map.getLayer("path")) {
      this.map.removeLayer("path");
      this.map.removeSource("path");
    }
  }

  private updateFlights() {
    this.flights.forEach((f, id, map) => {
      if (f.lon && f.lon && f.speed && f.heading) {
        map.set(id, DashboardUtils.updatePosition(f, DashboardComponent.CLIENT_UPDATE_INTERVAL));
        this.updateFlight(f, true);
      }
    });
  }
}

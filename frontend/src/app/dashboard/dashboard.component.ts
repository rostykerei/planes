import {AfterViewInit, Component} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {MapService} from "../map.service";
import {MapFlight} from "../model/map-flight";
import {LngLat} from "../model/lng-lat";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  map: mapboxgl.Map;
  popup: mapboxgl.Popup;

  flights : any = {};
  drawnFlights = new Set();

  drawnFlight : number = null;
  drawnPath: any[] = [];

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
      setInterval(() => this.loadFlights(), 5000);
    });
  }

  flightsLoaded(flights : MapFlight[]) {
    this.flights = {};
    flights.forEach(f => this.flights[f.id] = f);
    this.updateMap();
  }

  updateMap() {
    // Delete disappeared flights
    this.drawnFlights.forEach(f => {
      if (!this.flights.hasOwnProperty(f)) {
        if (f == this.drawnFlight) {
          this.drawnPath = [];
          this.map.removeLayer('path');
          this.map.removeSource('path');
        }

        this.map.removeLayer('f' + f);
        this.map.removeSource('f' + f);
      }
    });

    this.drawnFlights = new Set();

    for (let id in this.flights) {
      this.updateFlight(this.flights[id]);
      this.drawnFlights.add(id);
    }
  }

  updateFlight(f : MapFlight) {
    if (this.map.getSource("f" + f.id)) {

      this.map.getSource("f" + f.id).setData({
        "type": "Point",
        "coordinates": [f.lon, f.lat]
      });

      this.map.setLayoutProperty("f" + f.id, 'icon-rotate', f.heading || 0);

      if (f.id == this.drawnFlight) {
        if (f.lat &&  f.lon) {
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
      this.map.addSource("f" + f.id, {type: 'geojson',
        data: {
          "geometry": {
            "type": "Point",
            "coordinates": [f.lon, f.lat]},
          "type": "Feature",
          "properties": {}
        }
      });

      this.map.addLayer({
        "id": "f" + f.id,
        "type": "symbol",
        "source": "f" +  f.id,
        "layout": {
          "icon-image": "airport-15",
          "icon-rotation-alignment": "map",
          "icon-rotate": f.heading || 0,
          'icon-allow-overlap': true,
          'text-allow-overlap': true
        }
      });


      this.map.on('click', "f" + f.id, (e) => {
        let id : number = parseInt(e.features[0].layer.id.substring(1));
        this.map.flyTo({center: e.lngLat});

        this.loadPath(id);
        this.loadDetails(id);
      });

      this.map.on('mouseenter', "f" + f.id, (e) => {
        let id : number = parseInt(e.features[0].layer.id.substring(1));

        this.map.getCanvas().style.cursor = 'pointer';
        this.popup.setLngLat(e.lngLat)
          .setHTML(this.formatPopup(id))
          .addTo(this.map);
      });

      this.map.on('mouseleave', "f" + f.id, () => {
        this.map.getCanvas().style.cursor = '';
        this.popup.remove();
      });
    }
  }

  formatPopup(id : number) : String {
    let s = this.flights[id].callsign || 'UNKNOWN';

    if (this.flights[id].type) {
      s += '<br/>' + this.flights[id].type;
    }

    if (this.flights[id].from || this.flights[id].to) {
      s += '<br/>';
      s += this.flights[id].from || '????';
      s += ' &rarr; ';
      s += this.flights[id].to || '????';
    }

    return s;
  }

  loadFlights() {
    this.mapService.getActiveFlights().subscribe(f => this.flightsLoaded(f));
  }

  loadPath(id : number) {
    this.mapService.getFlightPath(id).subscribe(path => this.pathLoaded(id, path));
  }

  pathLoaded(id: number, path : LngLat[]) {
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

    this.map.addLayer({
      "id": "path",
      "type": "line",
      "source": "path",
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#f00",
        "line-width": 2
      }
    });

    this.drawnFlight = id;
  }

  loadDetails(id : number) {
    console.log(' details ' + id);
  }

}

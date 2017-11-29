import {AfterViewInit, Component} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {MapService} from "../map.service";
import {MapFlight} from "../model/map-flight";

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
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 7,
      center: [4.764167, 52.308056]
    });

  }

  flightsLoaded(flights : MapFlight[]) {
    this.flights = {};

    flights.forEach(f => {
      this.flights[f.id] = f;
    });

    this.updateMap();
  }

  updateMap() {
    // Delete disappeared flights
    this.drawnFlights.forEach(f => {
      if (!this.flights.hasOwnProperty(f)) {
        this.map.removeSource('f' + f);
        this.map.removeLayer('f' + f);
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
        this.map.flyTo({center: e.lngLat});
        // todo
      });

      this.map.on('mouseenter', "f" + f.id, (e) => {
        let id : number = parseInt(e.features[0].layer.id.substring(1));


        this.map.getCanvas().style.cursor = 'pointer';
        this.popup.setLngLat(e.lngLat)
          .setHTML(this.formatPopup(id))
          .addTo(this.map);
      });

      // Change it back to a pointer when it leaves.
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


  testBtnClick() {
    this.mapService.getActiveFlights().subscribe(f => this.flightsLoaded(f));
  }
}

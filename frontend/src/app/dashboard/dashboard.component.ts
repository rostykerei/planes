import {AfterViewInit, Component} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {MapService} from "../map.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  map: mapboxgl.Map;

  layers : any = {};

  constructor(private mapService: MapService) {
  }

  ngAfterViewInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9zdHlrZXJlaSIsImEiOiJjaXVpdXk1enowMDNwMnlwcjFicTgyZG5jIn0.JFWHhjOLeynWdzP-Xyojww';

    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 7,
      center: [4.764167, 52.308056]
    });

  }


  testBtnClick() {

    this.mapService.getActiveFlights().forEach(ff => {
      ff.forEach(f => {

        this.layers["f" + f.id] = true;

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
              "icon-rotate": f.heading || 0
            }
          });

          this.map.on('click', "f" + f.id, (e) => {
            this.map.flyTo({center: e.lngLat});
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(e.toString())
              .addTo(this.map);
          });

          this.map.on('mouseenter', "f" + f.id, () => {
            this.map.getCanvas().style.cursor = 'pointer';
          });

          // Change it back to a pointer when it leaves.
          this.map.on('mouseleave', "f" + f.id, () => {
            this.map.getCanvas().style.cursor = '';
          });

        }
      });
    });

    /* this.map.removeSource('drone');
    this.map.removeLayer('drone'); */
  }
}

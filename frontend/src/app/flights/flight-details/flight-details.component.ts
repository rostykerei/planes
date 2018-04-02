import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FlightService} from "../../flight.service";
import {LngLat} from "../../model/lng-lat";
import {FlightLog} from "../../model/flight-log";
import {MatSliderChange} from "@angular/material";
import {environment} from "../../../environments/environment";
import {ChartReadyEvent} from "ng2-google-charts";

declare const google: any;

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit, AfterViewInit {

  private log: FlightLog[] = [];
  private logEntry: FlightLog;
  private logMap: any;
  private logMarker: any;
  private logPath: any;

  @ViewChild('logChartView') logChartView;

  logChart: any;
  logChartMarker: any = {
    left: '0px',
    top: '0px',
    height: '0px'
  };

  constructor(private route: ActivatedRoute, private flightService: FlightService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.flightService.getFlightDetails(id).subscribe(f => this.detailsLoaded(f));
    this.flightService.getFlightLog(id).subscribe(f => this.logLoaded(f));
  }

  ngAfterViewInit(): void {
    const mapProp = {
      center: new google.maps.LatLng(environment.mapStartLat, environment.mapStartLon),
      zoom: environment.mapStartZoom,
      mapTypeId: environment.mapTypeId,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_LEFT
      },
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      }
    };

    this.logMap = new google.maps.Map(document.getElementById('log-map'), mapProp);
  }

  private detailsLoaded(path: LngLat[]): void {
    console.log(path);
  }

  private logLoaded(log: FlightLog[]) {
    this.log = log;
    this.logEntry = log[log.length - 1];

    let path = [];
    const dataTable = [];
    dataTable.push(['Time', 'Altitude (ft)', 'Speed (kt)']);

    for (let entry of log) {
      if (entry.latitude && entry.longitude) {
        path.push({lat: entry.latitude, lng: entry.longitude});
      }
      dataTable.push([new Date(entry.timestamp), entry.altitude, entry.speed]);
    }

    this.logPath = new google.maps.Polyline({
      map: this.logMap,
      path: path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    this.logChart = {
      chartType: 'LineChart',
      dataTable: dataTable,
      options: {
        height: 200,
        curveType: 'function',
        backgroundColor: {fill: 'transparent'},
        theme: 'material',
        legend: {position: 'bottom'},
        series: {
          0: {targetAxisIndex: 0},
          1: {targetAxisIndex: 1},
        },
        interpolateNulls: true,
        chartArea: {width: '87%', height: '80%'}
      }
    };

    this.logMarker = new google.maps.Marker({
      map: this.logMap,
      icon: this.getIcon(this.logEntry.heading || 0)
    });

    if (this.logEntry.latitude && this.logEntry.longitude) {
      this.logMarker.setPosition({lat: this.logEntry.latitude, lng: this.logEntry.longitude});
    }
  }

  sliderMove($event: MatSliderChange) {
    this.logEntry = this.log[$event.value];

    if (this.logEntry.latitude && this.logEntry.longitude) {
      this.logMarker.setPosition({lat: this.logEntry.latitude, lng: this.logEntry.longitude});
    }

    this.logMarker.setIcon(this.getIcon(this.logEntry.heading || 0));

    this.logChartMarker.left = this.logChartView.wrapper.getChart().getChartLayoutInterface().getXLocation(new Date(this.logEntry.timestamp)) + 'px';
  }


  private getIcon(heading: number): any {
    return {
      path: 'm 32,1 2,1 2,3 0,18 4,1 0,-4 3,0 0,5 17,6 0,3 -15,-2 -9,0 0,12 -2,6 7,3 0,2 -8,-1 -1,2 -1,-2 -8,1 0,-2 7,' +
      '-3 -2,-6 0,-12 -9,0 -15,2 0,-3 17,-6 0,-5 3,0 0,4 4,-1 0,-18 2,-3 2,-1z',
      anchor: new google.maps.Point(32, 28),
      scale: 0.4,
      fillColor: 'orange',
      fillOpacity: 0.8,
      strokeWeight: 1,
      rotation: heading
    };
  }

  private logChartReady($event: ChartReadyEvent) {
    let cli = this.logChartView.wrapper.getChart().getChartLayoutInterface();

    if (this.logEntry) {
      this.logChartMarker.left = cli.getXLocation(new Date(this.logEntry.timestamp)) + 'px';
    }

    this.logChartMarker.top = cli.getChartAreaBoundingBox().top + 'px';
    this.logChartMarker.height = cli.getChartAreaBoundingBox().height + 'px';
  }
}

import {Component} from '@angular/core';
import {StatsService} from './stats.service';
import {NameValue} from '../model/name-value';
import {Filter} from '../filter/filter';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  aircraftsChart;
  airlinesChart;
  originsChart;
  destinationsChart;

  flightsChart = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Date', 'Flights tracked'],
      [new Date(2018, 0, 1), Math.random() * 1000],
      [new Date(2018, 0, 2), Math.random() * 1000],
      [new Date(2018, 0, 3), Math.random() * 1000],
      [new Date(2018, 0, 4), Math.random() * 1000],
      [new Date(2018, 0, 5), Math.random() * 1000],
      [new Date(2018, 0, 6), Math.random() * 1000],
      [new Date(2018, 0, 7), Math.random() * 1000],
      [new Date(2018, 0, 8), Math.random() * 1000],
      [new Date(2018, 0, 9), Math.random() * 1000],
      [new Date(2018, 0, 10), Math.random() * 1000]
    ],
    options: {
      title: 'Flights per day',
      height: 280,
      titleTextStyle: {
        fontName: 'Roboto',
        fontSize: 24,
        bold: false
      },
      legend: 'none',
      backgroundColor: { fill:'transparent' }
    }
  };

  constructor(private statsService: StatsService) {
  }


  filterChange(event: Filter) {
    this.statsService.getTopAircrafts(event.toQueryString()).subscribe(data => this.topAircraftsLoaded(data));
    this.statsService.getTopAirlines(event.toQueryString()).subscribe(data => this.topAirlinesLoaded(data));
    this.statsService.getTopOrigins(event.toQueryString()).subscribe(data => this.topOriginsLoaded(data));
    this.statsService.getTopDestinations(event.toQueryString()).subscribe(data => this.topDestinationsLoaded(data));
  }

  topAircraftsLoaded(data: NameValue[]): void {
    const dataTable = [];
    dataTable.push(['Aircraft', 'Flights']);

    data.forEach(d => {
      dataTable.push([d.name, d.value]);
    });

    this.aircraftsChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: {
        title: 'Top Aircrafts', height: 280, legend: 'right',
        titleTextStyle: {
          fontName: 'Roboto',
          fontSize: 24,
          bold: false
        },
        backgroundColor: { fill:'transparent' }
      }
    };
  }

  topAirlinesLoaded(data: NameValue[]): void {
    const dataTable = [];
    dataTable.push(['Airlines', 'Flights']);

    data.forEach(d => {
      dataTable.push([d.name, d.value]);
    });

    this.airlinesChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: {
        title: 'Top Airlines', height: 280, legend: 'right',
        titleTextStyle: {
          fontName: 'Roboto',
          fontSize: 24,
          bold: false
        },
        backgroundColor: { fill:'transparent' }
      }
    };
  }

  topOriginsLoaded(data: NameValue[]): void {
    const dataTable = [];
    dataTable.push(['Airport', 'Flights']);

    data.forEach(d => {
      dataTable.push([d.name, d.value]);
    });

    this.originsChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: {
        title: 'Top Origins', height: 280, legend: 'right',
        titleTextStyle: {
          fontName: 'Roboto',
          fontSize: 24,
          bold: false
        },
        backgroundColor: { fill:'transparent' }
      }
    };
  }

  topDestinationsLoaded(data: NameValue[]): void {
    const dataTable = [];
    dataTable.push(['Airport', 'Flights']);

    data.forEach(d => {
      dataTable.push([d.name, d.value]);
    });

    this.destinationsChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: {
        title: 'Top Destinations', height: 280, legend: 'right',
        titleTextStyle: {
          fontName: 'Roboto',
          fontSize: 24,
          bold: false
        },
        backgroundColor: { fill:'transparent' }
      }
    };
  }
}

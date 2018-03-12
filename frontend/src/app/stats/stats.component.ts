import {Component} from '@angular/core';
import {StatsService} from './stats.service';
import {CodeNameValue} from '../model/code-name-value';
import {Filter} from '../filter/filter';

declare const google: any;

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
      height: 300,
      titleTextStyle: {
        fontName: 'Roboto',
        fontSize: 24,
        bold: false,
        color: '#000000'
      },
      legend: 'none',
      backgroundColor: { fill:'transparent' },
      theme: 'material'
    }
  };

  constructor(private statsService: StatsService) {
  }


  filterChange(event: Filter) {
    this.statsService.getTopTypes(event.toQueryString()).subscribe(data => this.topTypesLoaded(data));
    this.statsService.getTopAirlines(event.toQueryString()).subscribe(data => this.topAirlinesLoaded(data));
    this.statsService.getTopOrigins(event.toQueryString()).subscribe(data => this.topOriginsLoaded(data));
    this.statsService.getTopDestinations(event.toQueryString()).subscribe(data => this.topDestinationsLoaded(data));
  }

  topTypesLoaded(data: CodeNameValue[]): void {
    const dataTable = [];
    dataTable.push(['Types', 'Flights']);

    data.forEach(d => {
      dataTable.push([d.code, d.value]);
    });

    this.aircraftsChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: {
        title: 'Top Types', height: 300, legend: 'right',
        titleTextStyle: {
          fontName: 'Roboto',
          fontSize: 24,
          bold: false,
          color: '#000000'
        },
        backgroundColor: { fill:'transparent' },
        theme: 'material'
      }
    };
  }

  topAirlinesLoaded(data: CodeNameValue[]): void {
    const dataTable = [];
    dataTable.push(['Airlines', 'Flights']);

    data.forEach(d => {
      dataTable.push([d.name, d.value]);
    });

    this.airlinesChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: {
        title: 'Top Airlines', height: 300, legend: 'right',
        titleTextStyle: {
          fontName: 'Roboto',
          fontSize: 24,
          bold: false,
          color: '#000000'
        },
        backgroundColor: { fill:'transparent' },
        theme: 'material'
      }
    };
  }

  topOriginsLoaded(data: CodeNameValue[]): void {
    const dataTable = [];
    dataTable.push(['Airport', 'Flights']);

    data.forEach(d => {
      dataTable.push([d.name, d.value]);
    });

    this.originsChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: {
        title: 'Top Origins', height: 300, legend: 'right',
        titleTextStyle: {
          fontName: 'Roboto',
          fontSize: 24,
          bold: false,
          color: '#000000'
        },
        backgroundColor: { fill:'transparent' },
        theme: 'material'
      }
    };
  }

  topDestinationsLoaded(data: CodeNameValue[]): void {
    const dataTable = [];
    dataTable.push(['Airport', 'Flights']);

    data.forEach(d => {
      dataTable.push([d.name, d.value]);
    });

    this.destinationsChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: {
        title: 'Top Destinations', height: 300, legend: 'right',
        titleTextStyle: {
          fontName: 'Roboto',
          fontSize: 24,
          bold: false,
          color: '#000000'
        },
        backgroundColor: { fill:'transparent' },
        theme: 'material'
      }
    };
  }
}

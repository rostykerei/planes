import {Component} from '@angular/core';
import {StatsService} from './stats.service';
import {CodeNameValue} from '../model/code-name-value';
import {Filter} from '../filter/filter';
import {DateValue} from "../model/date-value";

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

  flightsChart;

  constructor(private statsService: StatsService) {
  }


  filterChange(event: Filter) {
    this.statsService.getTopTypes(event.toQueryString()).subscribe(data => this.topTypesLoaded(data));
    this.statsService.getTopAirlines(event.toQueryString()).subscribe(data => this.topAirlinesLoaded(data));
    this.statsService.getFlights(event.toQueryString()).subscribe(data => this.flightsLoaded(data));
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

  private flightsLoaded(data: DateValue[]) {
    console.log(data);

    const dataTable = [];
    dataTable.push(['Date', 'Flights']);

    data.forEach(d => {
      dataTable.push([new Date(d.date), d.value]);
    });

    this.flightsChart = {
      chartType: 'LineChart',
      dataTable: dataTable,
      options: {
        title: 'Flights per day',
        curveType: 'function',
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
  }
}

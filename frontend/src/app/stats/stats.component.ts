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

  originsChart = {
    chartType: 'PieChart',
    dataTable: [
      ['Airport', 'Flights'],
      ['EHAM', Math.random() * 1000],
      ['EGLL', Math.random() * 1000],
      ['EGSS', Math.random() * 1000],
      ['EGCC', Math.random() * 1000],
      ['EGGW', Math.random() * 1000],
      ['EDDF', Math.random() * 1000],
      ['EBBR', Math.random() * 1000],
      ['EDDM', Math.random() * 1000],
      ['LFPG', Math.random() * 1000],
      ['EIDW', Math.random() * 1000],
    ],
    options: {
      title: 'Top Origins', height: 280, legend: 'right',
      titleTextStyle: {
        fontName: 'Roboto',
        fontSize: 24,
        bold: false
      }
    }
  };

  destinationsChart = {
    chartType: 'PieChart',
    dataTable: [
      ['Airport', 'Flights'],
      ['EHAM', Math.random() * 1000],
      ['EGLL', Math.random() * 1000],
      ['EGSS', Math.random() * 1000],
      ['EGGW', Math.random() * 1000],
      ['EIDW', Math.random() * 1000],
      ['EGKK', Math.random() * 1000],
      ['EKCH', Math.random() * 1000],
      ['EGCC', Math.random() * 1000],
      ['ESSA', Math.random() * 1000],
      ['EGBB', Math.random() * 1000],
    ],
    options: {
      title: 'Top Destinations', height: 280, legend: 'right',
      titleTextStyle: {
        fontName: 'Roboto',
        fontSize: 24,
        bold: false
      }
    },
  };

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
      legend: 'none'
    }
  };

  constructor(private statsService: StatsService) {
  }



  filterReady(event: Filter) {
    console.log('filter ready');
    console.log(event);

    this.statsService.getTopAircrafts().subscribe(data => this.topAircraftsLoaded(data));
    this.statsService.getTopAirlines().subscribe(data => this.topAirlinesLoaded(data));
  }

  filterChange(event: Filter) {
    console.log('filter changed');
    console.log(event.toQueryString());
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
        }
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
        }
      }
    };
  }

}

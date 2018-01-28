import {Component, OnInit} from '@angular/core';
import {StatsService} from "./stats.service";
import {NameValue} from "../model/name-value";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  aircraftsChart;

  airlinesChart = {
    chartType: 'PieChart',
    dataTable: [
      ['Airline', 'Flights'],
      ['KLM', Math.random() * 1000],
      ['RYR', Math.random() * 1000],
      ['BAW', Math.random() * 1000],
      ['EZY', Math.random() * 1000],
      ['KLC', Math.random() * 1000],
      ['WZZ', Math.random() * 1000],
      ['DLH', Math.random() * 1000],
      ['BEE', Math.random() * 1000],
      ['AFR', Math.random() * 1000],
      ['TRA', Math.random() * 1000],
    ],
    options: {
      title: 'Top Airlines', height: 280, legend: 'right',
      titleTextStyle: {
        fontName: 'Roboto',
        fontSize: 24,
        bold: false
      }
    }
  };

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

  ngOnInit() {
    this.statsService.getTopAircrafts().subscribe(data => this.topAircraftsLoaded(data));
  }

  topAircraftsLoaded(data: NameValue[]) : void {
    let dataTable = [];
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

}

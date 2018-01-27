import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  aircraftsChart = {
    chartType: 'PieChart',
    dataTable: [
      ['Aircraft', 'Flights'],
      ['B738', Math.random() * 1000],
      ['A320', Math.random() * 1000],
      ['A319', Math.random() * 1000],
      ['E190', Math.random() * 1000],
      ['A321', Math.random() * 1000],
      ['B737', Math.random() * 1000],
      ['B77W', Math.random() * 1000],
      ['E75L', Math.random() * 1000],
      ['DH8D', Math.random() * 1000],
      ['B772', Math.random() * 1000],
    ],
    options: {
      title: 'Top Aircrafts', height: 280, legend: 'right',
      titleTextStyle: {
        fontName: 'Roboto',
        fontSize: 24,
        bold: false
      }
    }
  };

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

  constructor() {
  }

  ngOnInit() {
  }

}

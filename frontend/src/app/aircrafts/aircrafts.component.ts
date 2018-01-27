import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-aircrafts',
  templateUrl: './aircrafts.component.html',
  styleUrls: ['./aircrafts.component.scss']
})
export class AircraftsComponent implements OnInit {

  pieChartData =  {
    chartType: 'PieChart',
    dataTable: [
      ['Aircraft', 'Flights in the last 24 hours'],
      ['B738',     1597],
      ['A320',      1056],
      ['A319',  685],
      ['E190', 442],
      ['A321', 363],
      ['B737', 268],
      ['B77W', 197],
      ['E75L', 161],
      ['DH8D', 144],
      ['B772',    105]
    ],
    options: {'title': 'Aircrafts'},
  };

  constructor() { }

  ngOnInit() {
  }

}

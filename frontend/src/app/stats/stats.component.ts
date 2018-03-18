import {Component, ViewChild} from '@angular/core';
import {StatsService} from './stats.service';
import {CodeNameValue} from '../model/code-name-value';
import {Filter} from '../filter/filter';
import {DateValue} from "../model/date-value";
import {PairValue} from "../model/pair-value";

declare const google: any;

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class StatsComponent {

  @ViewChild('typesChartView') typesChartView;
  @ViewChild('airlinesChartView') airlinesChartView;
  @ViewChild('originsChartView') originsChartView;
  @ViewChild('destinationsChartView') destinationsChartView;
  @ViewChild('flightsChartView') flightsChartView;
  @ViewChild('routesChartView') routesChartView;

  typesChart;
  airlinesChart;
  originsChart;
  destinationsChart;
  flightsChart;
  routesChart;

  pieOptions = {
    height: 300,
    legend: 'right',
    titleTextStyle: {
      fontName: 'Roboto',
      fontSize: 24,
      bold: false,
      color: '#000000'
    },
    pieSliceText: 'none',
    backgroundColor: {
      fill: 'transparent'
    },
    theme: 'material'
  };


  constructor(private statsService: StatsService) {
  }

  filterChange(event: Filter) {
    this.statsService.getTopTypes(event.toQueryString()).subscribe(data => this.topTypesLoaded(data));
    this.statsService.getTopAirlines(event.toQueryString()).subscribe(data => this.topAirlinesLoaded(data));
    this.statsService.getFlights(event.toQueryString()).subscribe(data => this.flightsLoaded(data));
    this.statsService.getTopOrigins(event.toQueryString()).subscribe(data => this.topOriginsLoaded(data));
    this.statsService.getTopDestinations(event.toQueryString()).subscribe(data => this.topDestinationsLoaded(data));
    this.statsService.getTopRoutes(event.toQueryString()).subscribe(data => this.topRoutesLoaded(data));
  }

  topTypesLoaded(data: CodeNameValue[]): void {
    const dataTable = [];
    dataTable.push(['Types', 'Flights', {'type': 'string', 'role': 'tooltip'}]);

    data.forEach(d => {
      dataTable.push([d.code, d.value, `${d.code}\n${d.name}\nFlights: ${d.value}`]);
    });

    this.typesChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: Object.assign({ title: 'Top Types'}, this.pieOptions)
    };
  }

  topAirlinesLoaded(data: CodeNameValue[]): void {
    const dataTable = [];
    dataTable.push(['Airlines', 'Flights', {'type': 'string', 'role': 'tooltip'}]);

    data.forEach(d => {
      dataTable.push([d.code, d.value, `${d.code}\n${d.name}\nFlights: ${d.value}`]);
    });

    this.airlinesChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: Object.assign({ title: 'Top Airlines'}, this.pieOptions)
    };
  }

  topOriginsLoaded(data: CodeNameValue[]): void {
    const dataTable = [];
    dataTable.push(['Airport', 'Flights', {'type': 'string', 'role': 'tooltip'}]);

    data.forEach(d => {
      dataTable.push([d.code, d.value, `${d.code}\n${d.name}\nFlights: ${d.value}`]);
    });

    this.originsChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: Object.assign({ title: 'Top Origins'}, this.pieOptions)
    };
  }

  topDestinationsLoaded(data: CodeNameValue[]): void {
    const dataTable = [];
    dataTable.push(['Airport', 'Flights', {'type': 'string', 'role': 'tooltip'}]);

    data.forEach(d => {
      dataTable.push([d.code, d.value, `${d.code}\n${d.name}\nFlights: ${d.value}`]);
    });

    this.destinationsChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: Object.assign({ title: 'Top Destinations'}, this.pieOptions)
    };
  }

  private flightsLoaded(data: DateValue[]) {
    const dataTable = [];
    dataTable.push(['Date', 'Flights']);

    data.forEach(d => {
      dataTable.push([new Date(d.date), d.value]);
    });

    this.flightsChart = {
      chartType: 'ColumnChart',
      dataTable: dataTable,
      options: {
        height: 300,
        title: 'Number of flights',
        titleTextStyle: {
          fontName: 'Roboto',
          fontSize: 24,
          bold: false,
          color: '#000000'
        },
        legend: 'none',
        backgroundColor: {fill: 'transparent'},
        theme: 'material'
      }
    };
  }

  private topRoutesLoaded(data: PairValue[]) {
    const dataTable = [];
    dataTable.push(['From', 'To', 'Number of flights', {'type': 'string', 'role': 'tooltip', 'p': {'html': true}}]);


    data.forEach(d => {
      let tooltip = `<div style="font-family: Roboto; color: rgba(0,0,0,.54); padding: 6px;"><b>${d.firstCode}</b> ${d.firstName}<br/>
        <b>${d.secondCode}</b> ${d.secondName} <br/>
        <b>Flights number:</b> ${d.value}
        </div>`;

      dataTable.push(['From: ' + d.firstCode, 'To: ' + d.secondCode, d.value, tooltip]);
    });

    this.routesChart = {
      chartType: 'Sankey',
      dataTable: dataTable,
      options: {
        height: 300,
        backgroundColor: {fill: 'transparent'},
        theme: 'material',
        tooltip: { isHtml: true }
      }
    };
  }

  onResize() {
    if (!!this.typesChartView.wrapper) {
      this.typesChartView.redraw();
    }

    if (!!this.airlinesChartView.wrapper) {
      this.airlinesChartView.redraw();
    }

    if (!!this.originsChartView.wrapper) {
      this.originsChartView.redraw();
    }

    if (!!this.destinationsChartView.wrapper) {
      this.destinationsChartView.redraw();
    }

    if (!!this.flightsChartView.wrapper) {
      this.flightsChartView.redraw();
    }

    if (!!this.routesChartView.wrapper) {
      this.routesChartView.redraw();
    }
  }
}

import {Component} from '@angular/core';

@Component({
  selector: 'app-flights-filter',
  templateUrl: './flights-filter.component.html',
  styleUrls: ['./flights-filter.component.scss']
})
export class FlightsFilterComponent {

  change(field: string, value: Set<string>) {
    console.log(field);
    console.log(value);
  }
}

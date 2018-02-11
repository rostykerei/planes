import {AutocompleteComponent} from "./autocomplete.component";
import {Component} from "@angular/core";

@Component({
  selector: 'app-routes-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class RoutesAutocompleteComponent extends AutocompleteComponent {

  title: string = 'Flights';

  getApiName(): string {
    return "routes";
  }

  protected getChipText(a: any): string {
    return a.callsign;
  }

  protected getOptionText(a: any): string {
    return '<b>' + a.callsign
      + (a.number ? ' / ' + a.number : '')
      + '</b>&nbsp;'
      + (a.airportFrom ? (a.airportFrom.code || '') + ' - ' : '')
      + (a.airportTo ? (a.airportTo.code || '') : '');
  }
}

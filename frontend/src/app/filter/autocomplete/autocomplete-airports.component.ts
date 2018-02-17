import {AutocompleteComponent} from './autocomplete.component';
import {Component} from '@angular/core';

@Component({
  selector: 'app-autocomplete-airports',
  templateUrl: './autocomplete-airports.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteAirportsComponent extends AutocompleteComponent {

  title = 'Airports';

  getApiName(): string {
    return 'airports';
  }
}

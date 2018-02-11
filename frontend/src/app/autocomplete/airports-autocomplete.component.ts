import {AutocompleteComponent} from "./autocomplete.component";
import {Component} from "@angular/core";

@Component({
  selector: 'app-airports-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AirportsAutocompleteComponent extends AutocompleteComponent {

  title: string = 'Airports';

  getApiName(): string {
    return "airports";
  }
}

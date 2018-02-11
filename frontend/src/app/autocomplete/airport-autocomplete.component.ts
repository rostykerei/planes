import {AutocompleteComponent} from "./autocomplete.component";
import {Component} from "@angular/core";

@Component({
  selector: 'app-chips-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AirportAutocompleteComponent extends AutocompleteComponent {

  getApiName(): string {
    return "airports";
  }
}

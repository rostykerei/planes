import {AutocompleteComponent} from "./autocomplete.component";
import {Component} from "@angular/core";
import {AutocompleteService} from "../autocomplete.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-chips-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AirportAutocompleteComponent extends AutocompleteComponent {

  constructor(private _sanitizer: DomSanitizer, autoCompleteService: AutocompleteService) {
    super(autoCompleteService);
  }

  getChipText(a: any): boolean {
    return a.code;
  }
}

import {AutocompleteComponent} from "./autocomplete.component";
import {Component} from "@angular/core";

@Component({
  selector: 'app-aircrafts-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AircraftsAutocompleteComponent extends AutocompleteComponent {

  title: string = 'Aircrafts';

  getApiName(): string {
    return "aircrafts";
  }

  protected getChipText(a: any): string {
    return a.registration;
  }

  protected getOptionText(a: any): string {
    return '<b>' + a.registration + '</b>'
      + '&nbsp;:&nbsp;'
      + (a.model ? a.model : (a.type ? a.type.type : ''));
  }
}

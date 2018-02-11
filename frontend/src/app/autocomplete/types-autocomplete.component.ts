import {AutocompleteComponent} from "./autocomplete.component";
import {Component} from "@angular/core";

@Component({
  selector: 'app-types-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class TypesAutocompleteComponent extends AutocompleteComponent {

  title: string = 'Types';

  getApiName(): string {
    return "types";
  }

  protected getChipText(a: any): string {
    return a.type;
  }

  protected getOptionText(a: any): string {
    return '<b>' + a.type + '</b>&nbsp;:&nbsp;' + (a.manufacturer || '') + ' ' + (a.model || '');
  }
}

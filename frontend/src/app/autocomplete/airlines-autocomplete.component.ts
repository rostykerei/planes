import {AutocompleteComponent} from "./autocomplete.component";
import {Component} from "@angular/core";

@Component({
  selector: 'app-airlines-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AirlinesAutocompleteComponent extends AutocompleteComponent {

  title: string = 'Airlines';

  getApiName(): string {
    return "airlines";
  }

  protected getOptionText(a: any): string {
    return '<b>' + a.code + '</b>&nbsp;:&nbsp;' + a.name;
  }
}

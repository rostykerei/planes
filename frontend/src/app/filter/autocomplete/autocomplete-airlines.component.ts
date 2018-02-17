import {AutocompleteComponent} from './autocomplete.component';
import {Component} from '@angular/core';

@Component({
  selector: 'app-autocomplete-airlines',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteAirlinesComponent extends AutocompleteComponent {

  title = 'Airlines';

  getApiName(): string {
    return 'airlines';
  }

  protected getOptionText(a: any): string {
    return '<b>' + a.code + '</b>&nbsp;:&nbsp;' + a.name;
  }
}

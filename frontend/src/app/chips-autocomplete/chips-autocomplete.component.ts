import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material";
import {AutocompleteService} from "../autocomplete.service";

@Component({
  selector: 'app-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss']
})
export class ChipsAutocompleteComponent implements OnInit {

  @ViewChild('chipInput', {read: MatAutocompleteTrigger})
  private autoCompleteTrigger: MatAutocompleteTrigger;

  @Input() private title: string;

  // Set up reactive formcontrol
  autoCompleteChipList: FormControl = new FormControl();

  color = 'warn';

  options = new Set();

  chips = new Set();

  constructor(private autoCompleteService: AutocompleteService) {
  }

  ngOnInit() {
    this.autoCompleteChipList.valueChanges
      .subscribe(val => {
        if (val) {
          this.autoCompleteService.getAirports(val)
            .subscribe(res => {
              this.options.clear();

              res.forEach(a => {
                if (!this.chips.has(a)) {
                  this.options.add(a);
                }
              });
            });
        }
        else {
          this.options.clear();
        }
      })
  }

  inputBlur(input: any) {
    input.value = '';
  }

  addChip(event: MatAutocompleteSelectedEvent, input: any): void {
    // Define selection constant
    const selection = event.option.value;
    // Add chip for selected option
    this.chips.add(selection);

    // Remove selected option from available options and set filteredOptions
    ////this.options = this.options.filter(obj => obj.name !== selection.name);

    // Reset the autocomplete input text value
    if (input) {
      input.value = '';
    }
  }

  removeChip(chip: any): void {
    this.chips.delete(chip);
  }

}

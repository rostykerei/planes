import {Component, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-flights-filter',
  templateUrl: './flights-filter.component.html',
  styleUrls: ['./flights-filter.component.scss']
})
export class FlightsFilterComponent {

  @ViewChild('chipInput', {read: MatAutocompleteTrigger})
  private autoCompleteTrigger: MatAutocompleteTrigger;
  // Set up reactive formcontrol
  autoCompleteChipList: FormControl = new FormControl();
  // Set up values to use with Chips
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  // Set up Options Array
  options = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];
  // Define filteredOptins Array and Chips Array
  filteredOptions = [];
  chips = [];

  ngOnInit() {
    // Set initial value of filteredOptions to all Options
    this.filteredOptions = this.options;
    // Subscribe to listen for changes to AutoComplete input and run filter
    this.autoCompleteChipList.valueChanges.subscribe(val => {
      this.filterOptions(val);
    })
  }

  inputFocus() {
    setTimeout(() => {
      if (!this.autoCompleteTrigger.panelOpen) {
        this.autoCompleteTrigger.openPanel();
      }
    }, 10);
  }

  filterOptions(text: string) {
    // Set filteredOptions array to filtered options
    this.filteredOptions = this.options
      .filter(obj => obj.name.toLowerCase().indexOf(text.toString().toLowerCase()) === 0);
  }

  addChip(event: MatAutocompleteSelectedEvent, input: any): void {
    // Define selection constant
    const selection = event.option.value;
    // Add chip for selected option
    this.chips.push(selection);
    // Remove selected option from available options and set filteredOptions
    this.options = this.options.filter(obj => obj.name !== selection.name);
    this.filteredOptions = this.options;
    // Reset the autocomplete input text value
    if (input) {
      input.value = '';
    }
  }

  removeChip(chip: any): void {
    // Find key of object in array
    let index = this.chips.indexOf(chip);
    // If key exists
    if (index >= 0) {
      // Remove key from chips array
      this.chips.splice(index, 1);
      // Add key to options array
      this.options.push(chip);
    }
  }
}

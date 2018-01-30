import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material";

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
  // Set up values to use with Chips
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

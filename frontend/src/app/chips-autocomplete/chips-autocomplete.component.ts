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

  mymodel: string = '';

  // Set up reactive formcontrol
  autoCompleteChipList: FormControl = new FormControl();

  color = 'warn';

  // Set up Options Array
  options = [
  ];
  // Define filteredOptins Array and Chips Array
  filteredOptions = [];
  chips = [];


  constructor(private autoCompleteService: AutocompleteService) {
  }

  ngOnInit() {
    // Set initial value of filteredOptions to all Options
    this.filteredOptions = this.options;
    // Subscribe to listen for changes to AutoComplete input and run filter
    /*this.autoCompleteChipList.valueChanges.subscribe(val => {
      this.filterOptions(val);
    });*/

    this.autoCompleteChipList.valueChanges
      .subscribe(val => {
        if (val) {
          this.autoCompleteService.getAirports(val)
            .subscribe(res => {
              this.filteredOptions = [];

              res.forEach(a => {
                this.filteredOptions.push(a);
              });
            });
        }
        else {
          this.filteredOptions = [];
        }
      })
  }

  inputFocus() {
/*    setTimeout(() => {
      if (!this.autoCompleteTrigger.panelOpen) {
        this.autoCompleteTrigger.openPanel();
      }
    }, 10);*/
  }

  valuechange(newValue) {
    //this.mymodel = newValue;
    console.log(newValue)
  }

  inputBlur(input: any) {
    input.value = '';
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

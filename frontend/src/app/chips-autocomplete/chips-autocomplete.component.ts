import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material";
import {AutocompleteService} from "../autocomplete.service";

@Component({
  selector: 'app-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss']
})
export class ChipsAutocompleteComponent implements OnInit {

  @Input() private title: string;

  autoCompleteChipList: FormControl = new FormControl();

  options = [];

  chips = [];

  constructor(private autoCompleteService: AutocompleteService) {
  }

  ngOnInit() {
    this.autoCompleteChipList.valueChanges
      .subscribe(val => {
        this.options = [];

        if (val) {
          this.autoCompleteService.getAirports(val)
            .subscribe(res => {
              res.forEach(a => {
                for(let c of this.chips) {
                  if (this.isSame(c, a)) return;
                }

                  this.options.push(a);
              });
            });
        }
      });
  }

  isSame(a: any, b:any): boolean {
    return a.code === b.code;
  }

  addChip(event: MatAutocompleteSelectedEvent, input: any): void {
    const selection = event.option.value;
    this.chips.push(selection);
    if (input) {
      input.value = '';
    }
  }

  removeChip(chip: any): void {
    // Find key of object in array
    let index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }

}

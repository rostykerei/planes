import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material";
import {AutocompleteService} from "../autocomplete.service";

@Component({
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export abstract class AutocompleteComponent implements OnInit {

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
                  if (this.getChipText(a) === c) return;
                }

                  this.options.push(a);
              });
            });
        }
      });
  }

  abstract getChipText(a: any): boolean;

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

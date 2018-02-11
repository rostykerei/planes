import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material";
import {AutocompleteService} from "../autocomplete.service";

@Component({})
export abstract class AutocompleteComponent implements OnInit {

  @Input() title: string;

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
          this.autoCompleteService.getOptions(this.getApiName(), val)
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

  abstract getApiName(): string;

  protected getChipText(a: any): boolean {
    return a.code;
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

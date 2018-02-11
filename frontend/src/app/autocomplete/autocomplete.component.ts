import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material";
import {AutocompleteService} from "../autocomplete.service";

@Component({})
export abstract class AutocompleteComponent implements OnInit {

  @Input() title: string;

  autoCompleteChipList: FormControl = new FormControl();

  options = new Set<any>();
  chips = new Set<string>();

  constructor(private autoCompleteService: AutocompleteService) {
  }

  ngOnInit() {
    this.autoCompleteChipList.valueChanges
      .subscribe(val => {
        this.options.clear();

        if (val) {
          this.autoCompleteService
            .getOptions(this.getApiName(), val)
            .subscribe(res => {
              res.forEach(a => {
                if (this.chips.has(this.getChipText(a))) {
                  return;
                }

                this.options.add(a);
              });
            });
        }
      });
  }

  abstract getApiName(): string;

  protected getChipText(a: any): string {
    return a.code;
  }

  protected getOptionText(a: any): string {
    return a.name;
  }

  addChip(event: MatAutocompleteSelectedEvent, input: any): void {
    const selection = event.option.value;
    this.chips.add(selection);

    if (input) {
      input.value = '';
    }
  }

  removeChip(chip: string): void {
    this.chips.delete(chip);
  }

}

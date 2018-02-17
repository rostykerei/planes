import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {AutocompleteService} from '../../autocomplete.service';

@Component({})
export abstract class AutocompleteComponent implements OnInit {

  @Input() title: string;
  @Input() chipColor = '#D1C4E9';
  @Input() chips: Set<string> = new Set<string>();

  @Output() onChange: EventEmitter<Set<string>> = new EventEmitter();

  autoCompleteChipList: FormControl = new FormControl();
  options: Set<any> = new Set<any>();

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

    this.onChange.emit(this.chips);
  }

  removeChip(chip: string): void {
    this.chips.delete(chip);

    this.onChange.emit(this.chips);
  }

}

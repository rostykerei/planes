import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {DateAdapter} from "./date-adapter";
import {MatDateFormats} from "@angular/material/core/typings/datetime/date-formats";

export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: DateAdapter, useClass: DateAdapter}
  ]
})
export class DatepickerComponent implements OnInit {

  @Input() title: string;
  maxDate: Date = new Date();

  date = new FormControl();

  constructor() { }

  ngOnInit() {
  }

}

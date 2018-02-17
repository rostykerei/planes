import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {DatepickerDateAdapter} from "./datepicker-date-adapter";
import {MatDateFormats} from "@angular/material/core/typings/datetime/date-formats";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material";
import * as moment from 'moment';

export const DATE_FORMAT: MatDateFormats = {
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
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT},
    {provide: DateAdapter, useClass: DatepickerDateAdapter, deps: [MAT_DATE_LOCALE]}
  ]
})
export class DatepickerComponent {

  @Input() title: string;

  @Output() onChange: EventEmitter<String> = new EventEmitter();

  minDate: Date = new Date(2018, 1, 1);
  maxDate: Date = new Date();

  date = new FormControl();

  @Input()
  set value(val: string) {
    if (val) {
      let m = moment(val, 'DD-MM-YYYY');

      if (m.isValid()
        && m.toDate().getTime() >= this.minDate.getTime()
        && m.toDate().getTime() <= this.maxDate.getTime()) {

        this.date.setValue(m.toDate());
      }
      else {
        this.date.setValue(null);
      }
    }

  }

  change() {
    if (this.date.valid) {
      if (this.date.value) {
        this.onChange.emit(this.date.value.format("DD-MM-YYYY"));
      }
      else {
        this.onChange.emit(null);
      }
    }
  }

}

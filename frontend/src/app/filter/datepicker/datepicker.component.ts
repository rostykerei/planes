import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {DatepickerDateAdapter} from './datepicker-date-adapter';
import {MatDateFormats} from '@angular/material/core/typings/datetime/date-formats';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material';
import {DatepickerUtils} from './datapicker-utils';

export const DATE_FORMAT: MatDateFormats = {
  parse: {
    dateInput: DatepickerUtils.FORMAT,
  },
  display: {
    dateInput: DatepickerUtils.FORMAT,
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

  minDate: Date = DatepickerUtils.MIN_DATE;
  maxDate: Date = DatepickerUtils.MAX_DATE;

  date = new FormControl();

  @Input()
  set value(val: string) {
    if (DatepickerUtils.isValid(val)) {
      this.date.setValue(DatepickerUtils.toDate(val));
    } else {
      this.date.setValue(null);
    }
  }

  change() {
    if (this.date.valid) {
      if (this.date.value) {
        this.onChange.emit(DatepickerUtils.toString(this.date.value));
      } else {
        this.onChange.emit(null);
      }
    }
  }

}

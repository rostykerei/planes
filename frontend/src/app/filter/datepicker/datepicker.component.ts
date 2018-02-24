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
  @Output() onChange: EventEmitter<DateWrapper> = new EventEmitter();

  minDate: Date = DatepickerUtils.MIN_DATE;
  maxDate: Date = DatepickerUtils.MAX_DATE;

  date = new FormControl();

  dateWrapper: DateWrapper;

  @Input()
  set value(val: DateWrapper) {
    this.dateWrapper = val;
    this.date.setValue(val.date);
  }

  change() {
    if (this.date.valid) {
      if (this.date.value) {
        this.dateWrapper.date = this.date.value.toDate();
      } else {
        this.dateWrapper.date = null;
      }

      this.onChange.emit(this.dateWrapper);
    }
  }
}

export class DateWrapper {
  date: Date;
}

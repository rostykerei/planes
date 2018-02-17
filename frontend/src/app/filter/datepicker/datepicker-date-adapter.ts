import {MomentDateAdapter} from '@angular/material-moment-adapter';

export class DatepickerDateAdapter extends MomentDateAdapter {

  getFirstDayOfWeek(): number {
    return 1;
  }

}

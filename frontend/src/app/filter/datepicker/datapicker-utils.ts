import * as moment from 'moment';

export class DatepickerUtils {

  public static FORMAT = 'DD-MM-YYYY';
  public static MIN_DATE: Date = new Date(2018, 1, 1);
  public static MAX_DATE: Date = new Date();

  public static isValid(input: string): boolean {
    if (input) {
      const m = moment(input, this.FORMAT);

      return m.isValid()
        && m.toDate().getTime() >= this.MIN_DATE.getTime()
        && m.toDate().getTime() <= this.MAX_DATE.getTime();
    }

    return false;
  }

  public static toDate(input: string): Date {
    return moment(input, this.FORMAT).toDate();
  }

  public static toString(input: any): string {
    return input.format(DatepickerUtils.FORMAT);
  }
}

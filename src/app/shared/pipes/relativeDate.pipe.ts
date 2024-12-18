import { DatePipe } from '@angular/common';
import { inject, Pipe, type PipeTransform } from '@angular/core';


@Pipe({
  name: 'relativeDate',
  standalone: true,
})
export class RelativeDatePipe implements PipeTransform {

  private datePipe = inject(DatePipe);


  transform(value: Date | string): string {

    // voy a complicarme, solo xq quiero usar un pipe
    // y mostrar cosas personalizadas
    const date = new Date(value);
    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    const differenceInDays = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (!isNaN(date.getTime())) {

      if (this.campareDates(date, today)) return 'hoy';
      if (this.campareDates(date, yesterday)) return 'ayer';

      if (differenceInDays < 7) {
        return this.datePipe.transform(date, 'EEEE h:mm a') || '';
      }

      return this.datePipe.transform(date, 'd MMM, yy') || '';

    }
    // return 'wrong-date-format';
    return 'mal-formato-de-fecha';

  }

  campareDates(dateOne: Date, dateTwo: Date): boolean {
    if (
      dateOne.getDate() === dateTwo.getDate() &&
      dateOne.getMonth() === dateTwo.getMonth() &&
      dateOne.getFullYear() === dateTwo.getFullYear()
    ) {
      return true;
    }
    return false;
  }

}

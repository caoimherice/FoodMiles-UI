import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayHourMinute'
})
export class DayHourMinutePipe implements PipeTransform {

  transform(value: number): string {
    const days = Math.floor(value / (60 * 24));
    const hours = Math.floor((value % (60 * 24)) / 60);
    const minutes = value % 60;

    let result = '';
    if (days > 0) {
      result += `${days} days, `;
    }
    if (hours > 0) {
      result += `${hours} hours, `;
    }
    result += `${minutes} mins`;

    return result;
  }

}


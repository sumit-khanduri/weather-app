import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekday',
  standalone: true
})
export class WeekdayPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    // console.log(value)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(value);
    // console.log(d)
    return days[d.getDay()].slice(0, 3);
  }

}

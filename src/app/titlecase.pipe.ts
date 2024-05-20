import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecase',
  standalone: true
})
export class TitlecasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (!value) return value;
    return value[0].toUpperCase() + value.substring(1).toLowerCase();
  }

}

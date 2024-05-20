import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ceil',
  standalone: true
})
export class CeilPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return Math.ceil(value).toString();
  }

}

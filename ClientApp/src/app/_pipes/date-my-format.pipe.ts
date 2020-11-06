import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateMyFormat'
})
export class DateMyFormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}

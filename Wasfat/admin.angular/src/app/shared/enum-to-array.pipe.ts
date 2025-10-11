import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  transform(value: string[]): object {
    if(value) {
      return Object.keys(value).map(o => ({ value: +o, name: value[o] }));
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstWords'
})
export class FirstWordsPipe implements PipeTransform {
  transform(value: string | null | undefined, wordCount = 20): string {
    if (!value) return '';

    const words = value.trim().split(/\s+/);
    return words.length > wordCount
      ? words.slice(0, wordCount).join(' ') + '…'
      : value;
  }
}
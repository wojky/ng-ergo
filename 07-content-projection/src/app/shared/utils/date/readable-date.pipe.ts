import { Pipe, PipeTransform } from '@angular/core';

export function readableDateFormat(date: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

@Pipe({
  name: 'readableDate',
})
export class ReadableDatePipe implements PipeTransform {
  transform(date: string) {
    return readableDateFormat(date);
  }
}

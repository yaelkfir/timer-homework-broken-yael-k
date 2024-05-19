import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSeconds',
})
export class MinuteSecondsPipe implements PipeTransform {
  padValue(value: number): string {
    return value.toString().padStart(2, '0');
  }

  transform(value: number): string {
    value = typeof value === 'number' ? value : 0;
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value - minutes * 60;
    return `${this.padValue(minutes)}:${this.padValue(seconds)}`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
  standalone: true,
})
export class TruncateNamePipe implements PipeTransform {
  transform(
    full:string,
    maxLength: number | 16,
    ellipsis: string | '...'
  ): unknown {
   

    if (full.length > maxLength) {
      return full.slice(0, maxLength) + ellipsis;
    }

    return full;
  }
}

import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'mediaUrl',
  standalone: true,
})
export class MediaUrlPipe implements PipeTransform {

  transform(userName: string, url: string): string {
    if (!url) {
      return '/images/no-image.svg';
    }
    return `/multimedia/${userName}/${url}`;
  }

}

import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'publicationType',
  standalone: true,
})
export class PublicationTypePipe implements PipeTransform {

  transform(type: string): string {

    switch (type) {
      case 'pinned': return 'fa-solid fa-thumbtack';
      case 'album': return 'fa-solid fa-images';
      case 'reel': return 'fa-solid fa-video';
      default: return '';
    }
  }

}

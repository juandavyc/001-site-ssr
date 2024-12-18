import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage',
  standalone: true,
})
export class NoImagePipe implements PipeTransform {

  transform(image: string): string {
    if (!image) {
      return '/images/no-image.svg';
    }
    return image;
  }
}

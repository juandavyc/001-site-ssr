import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomCharacters',
  standalone: true,
})
export class RandomCharactersPipe implements PipeTransform {

  private CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  randomString(length: number):string {
    // let result = '';
    // for (let i = length; i > 0; --i) result += this.CHARS[Math.floor(Math.random() * this.CHARS.length)];
    // return result;
    return Array.from({length},()=>{
      return this.CHARS[Math.floor(Math.random() * this.CHARS.length)]
    }).join('')
  }

  transform(value: any): unknown {
    return this.randomString(5);
  }

}

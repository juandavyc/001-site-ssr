import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'hero-section',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HeroSectionComponent {


  public clicksCount = signal<number>(0);
  public photo = signal<string>('/images/juandavyc.png');

  public readonly content = {
    name: ' jUAN   daviD  yAra  CifUeNtEs ',
    organization: 'fuLL stack dEVElOper',
    note: 'la tEcnoloGÍa, el Aprendizaje   y construir soluciOnes   de Software sOn miS PRINCIPALES PASIONES.  '
  };

  public changePhoto() {
    this.clicksCount.update(valu => valu + 1);
    if (this.clicksCount() == 3) {
      this.photo.set('/images/easter-egg.png');
    }
    if(this.clicksCount() > 3){
      this.clicksCount.set(0)
      this.photo.set('/images/juandavyc.png'); ;
    }
  }
}

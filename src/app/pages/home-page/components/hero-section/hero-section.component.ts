import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
  public readonly content = {
    photo: '/images/juandavyc.png',
    name: ' jUAN   daviD  yAra  CifUeNtEs ',
    organization: 'fuLL stack dEVElOper',
    note: 'la tEcnoloGÍa, el Aprendizaje   y construir soluciOnes   de Software sOn miS PRINCIPALES PASIONES.  '
  };
}

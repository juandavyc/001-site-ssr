import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'skill-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillCardComponent {

  public icon = input<String>();
  public title = input<String>();
  public description = input<String>();

  constructor(){
   // console.log(this.icon())
  }
}

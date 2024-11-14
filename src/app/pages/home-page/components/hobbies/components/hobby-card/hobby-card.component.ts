import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'hobby-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './hobby-card.component.html',
  styleUrl: './hobby-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HobbyCardComponent {

  public title = input.required<String>();
  public icons = input.required<String[]>();
  public description = input.required<String>();
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Item } from '../../../../interfaces';
import { BadgeComponent } from '../../../../../../../../shared/components/badge/badge.component';
import { RelativeDatePipe } from '../../../../../../../../shared/pipes/relativeDate.pipe';

@Component({
  selector: 'card',
  standalone: true,
  imports: [
    BadgeComponent,
    RelativeDatePipe,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  public repository = input.required<Item>();
}

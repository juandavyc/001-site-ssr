import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Item } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { RelativeDatePipe } from "../../../../shared/pipes/relativeDate.pipe";
import { BadgeComponent } from '../../../../shared/badge/badge.component';

@Component({
  selector: 'github-repository-card',
  standalone: true,
  imports: [CommonModule, RelativeDatePipe, BadgeComponent],
  templateUrl: './github-repository-card.component.html',
  styleUrl: './github-repository-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubRepositoryCardComponent {
  public repository = input.required<Item>();
}

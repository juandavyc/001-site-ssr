import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GithubRepositoriesResponse } from '../../interfaces/github-repositories-response.interface';
import { RelativeDatePipe } from "../../../../shared/pipes/relativeDate.pipe";
import { BadgeComponent } from '../../../../shared/badge/badge.component';

@Component({
  selector: 'project-card',
  standalone: true,
  imports: [
    CommonModule,
    RelativeDatePipe,
    BadgeComponent
],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  public project = input.required<any>({});
}

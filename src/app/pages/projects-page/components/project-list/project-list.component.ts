import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { GithubRepositoriesResponse, Item } from '../../interfaces/github-repositories-response.interface';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'project-list',
  standalone: true,
  imports: [
    CommonModule,
    ProjectCardComponent
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent {

  public repositories = input.required<Item[]>();
  public toggleLayout = input<boolean>(true);
}

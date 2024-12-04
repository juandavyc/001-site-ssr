import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'github-repositories-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './github-repositories-skeleton.component.html',
  styleUrl: './github-repositories-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubRepositoriesSkeletonComponent {
  public isGridView = input.required<boolean>();
}

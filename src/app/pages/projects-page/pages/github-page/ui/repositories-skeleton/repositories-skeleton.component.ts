import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'repositories-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './repositories-skeleton.component.html',
  styleUrl: './repositories-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesSkeletonComponent {
  public isGridView = input.required<boolean>();
}

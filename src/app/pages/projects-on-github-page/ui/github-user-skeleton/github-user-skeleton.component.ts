import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'github-user-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './github-user-skeleton.component.html',
  styleUrl: './github-user-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubUserSkeletonComponent { }

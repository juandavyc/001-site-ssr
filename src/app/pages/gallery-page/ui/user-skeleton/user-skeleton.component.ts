import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'user-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './user-skeleton.component.html',
  styleUrl: './user-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSkeletonComponent { }

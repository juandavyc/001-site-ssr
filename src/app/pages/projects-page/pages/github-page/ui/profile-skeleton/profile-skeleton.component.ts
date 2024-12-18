import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'profile-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './profile-skeleton.component.html',
  styleUrl: './profile-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSkeletonComponent { }

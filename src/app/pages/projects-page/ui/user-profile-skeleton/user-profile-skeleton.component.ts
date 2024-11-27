import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'user-profile-skeleton',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-profile-skeleton.component.html',
  styleUrl: './user-profile-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileSkeletonComponent { }

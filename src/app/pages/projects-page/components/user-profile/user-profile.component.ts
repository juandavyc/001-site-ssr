import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { User } from '../../interfaces';
import { UserProfileSkeletonComponent } from '../../ui/user-profile-skeleton/user-profile-skeleton.component';

@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [
    CommonModule,
    UserProfileSkeletonComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  public user = input.required<User | null>();

}

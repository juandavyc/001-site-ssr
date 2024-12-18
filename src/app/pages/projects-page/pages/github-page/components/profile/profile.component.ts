import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { REPOSITORY_URLS } from '../../../../../../config/constants';
import { FiltersService } from '../../services/filters.service';
import { ProfileService } from '../../services/profile.service';
import { UserFetchState } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { ProfileSkeletonComponent } from '../../ui/profile-skeleton/profile-skeleton.component';
import { GithubCodeComponent } from '../../../../../../shared/components/github-code/github-code.component';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [
    CommonModule,
    ProfileSkeletonComponent,
    GithubCodeComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {

  public readonly url: string = REPOSITORY_URLS.github.profile;

  private filterService = inject(FiltersService);
  private service = inject(ProfileService);

  public userData = signal<UserFetchState>({ data: null, error: false });

  constructor() {

    effect(() => {
      const userName = this.filterService.getUserName();
      if (userName.length > 0) {
        this.service.userName.set(userName);
      }
    }, { allowSignalWrites: true })

    effect(() => {
      const userData = this.service.userSignal();
      this.userData.set(userData);
      this.filterService.isLoadedUser.set(userData.error ? false : true);
    }, { allowSignalWrites: true })
  }
}

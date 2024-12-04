import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { GithubFiltersService } from '../../services/github-filters.service';
import { CommonModule } from '@angular/common';
import { GithubUserProfileService } from '../../services/github-user-profile.service';
import { GithubUserSkeletonComponent } from "../../ui/github-user-skeleton/github-user-skeleton.component";
import { UserFetchState } from '../../interfaces';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { tokenHeaderInterceptor } from '../../../../auth/http/token-header.interceptor';



@Component({
  selector: 'github-user-profile',
  standalone: true,
  imports: [CommonModule, GithubUserSkeletonComponent],

  templateUrl: './github-user-profile.component.html',
  styleUrl: './github-user-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GithubUserProfileComponent {


  private filterService = inject(GithubFiltersService);
  private service = inject(GithubUserProfileService);

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

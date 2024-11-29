import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { GithubFiltersService } from '../../services/github-filters.service';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { GithubUserProfileService } from '../../services/github-user-profile.service';


@Component({
  selector: 'github-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './github-user-profile.component.html',
  styleUrl: './github-user-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubUserProfileComponent {

  private filterService = inject(GithubFiltersService);
  private service = inject(GithubUserProfileService);

  public userData = computed(() => {
    return this.service.getUserData()
  });

  constructor() {

    effect(() => {
      const userName = this.filterService.getUserName();
      if (userName.length > 0) {
        this.service.userName.set(userName);
      }
    }, { allowSignalWrites: true })

    effect(() => {
      const status = this.userData().error;
      this.filterService.isLoadedUser.set(!status);
    }, { allowSignalWrites: true })
  }


}

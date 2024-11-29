import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { GithubRepositoriesService } from '../../services/github-repositories.service';
import { GithubFiltersService } from '../../services/github-filters.service';
import { CommonModule } from '@angular/common';
import { Item } from '../../../projects-page/interfaces/github-repositories-response.interface';

@Component({
  selector: 'github-repositories',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './github-repositories.component.html',
  styleUrl: './github-repositories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubRepositoriesComponent {

  private filterService = inject(GithubFiltersService);
  private service = inject(GithubRepositoriesService);

  public repositories = computed(() => {
    if (this.filterService.isLoadedUser()) {
      const data = this.service.data();
      return data;
    }
    else {
      return { data: [], error: true }
    }
  })

  constructor() {
    effect(() => {
      const isLoadedUser = this.filterService.isLoadedUser();
      if (isLoadedUser) {
        this.service.form.set({
          userName: this.filterService.getUserName(),
          repository: this.filterService.getRepository(),
          language: this.filterService.getLanguage().toLowerCase(),
          sort: this.filterService.getSort().toLowerCase(),
        });
      }
    }, { allowSignalWrites: true })
  }
}

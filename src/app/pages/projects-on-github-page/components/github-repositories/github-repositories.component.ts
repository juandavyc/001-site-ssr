import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { RepositoriesFetchState } from '../../interfaces';
import { GithubRepositoryCardComponent } from '../github-repository-card/github-repository-card.component';
import { GithubRepositoriesSkeletonComponent } from "../../ui/github-repositories-skeleton/github-repositories-skeleton.component";
import { GithubFiltersService } from '../../services/github-filters.service';
import { GithubRepositoriesService } from '../../services/github-repositories.service';
@Component({
  selector: 'github-repositories',
  standalone: true,
  imports: [
    CommonModule,
    GithubRepositoryCardComponent,
    GithubRepositoriesSkeletonComponent
  ],
  templateUrl: './github-repositories.component.html',
  styleUrl: './github-repositories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubRepositoriesComponent {

  private filterService = inject(GithubFiltersService);
  private service = inject(GithubRepositoriesService);

  public currentPage = computed<number>(() => {
    return this.filterService.getCurrentPage();
  })

  public isGridView = computed<boolean>(() => {
    return this.filterService.isGridView()
  })

  public repositoriesData = signal<RepositoriesFetchState | null>(null);

  constructor() {
    effect(() => {
      if (this.filterService.isLoadedUser()) {
        this.service.form.set({
          userName: this.filterService.getUserName(),
          repository: this.filterService.getRepository(),
          language: this.filterService.getLanguage().toLowerCase(),
          sort: this.filterService.getSort().toLowerCase(),
          page: this.filterService.getCurrentPage(),
        });
      }
    }, { allowSignalWrites: true })

    effect(() => {
      if (this.filterService.isLoadedUser() ) {
        this.repositoriesData.set(this.service.repositoriesSignal());
      }
      else {
        this.repositoriesData.set({ data: null, error: true })
      }
    }, { allowSignalWrites: true })
  }

  public previusOrNextPage(page: number): void {
    this.filterService.setCurrentPage(this.currentPage() + (page));
  }
  public getMaxPages(max: number): number {
    return Math.ceil(max / 8);
  }
}

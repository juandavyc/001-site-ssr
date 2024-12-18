import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { GithubCodeComponent } from '../../../../../../shared/components/github-code/github-code.component';
import { RepositoriesSkeletonComponent } from '../../ui/repositories-skeleton/repositories-skeleton.component';
import { REPOSITORY_URLS } from '../../../../../../config/constants';
import { FiltersService } from '../../services/filters.service';
import { RepositoriesService } from '../../services/repositories.service';
import { RepositoriesFetchState } from '../../interfaces';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'repositories',
  standalone: true,
  imports: [
    CommonModule,
    RepositoriesSkeletonComponent,
    CardComponent,
    GithubCodeComponent,
  ],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesComponent {
  public readonly url: string = REPOSITORY_URLS.github.repositories;

  private filterService = inject(FiltersService);
  private service = inject(RepositoriesService);

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
      if (this.filterService.isLoadedUser()) {
        this.repositoriesData.set(this.service.repositoriesSignal());
      }
      else {
        this.repositoriesData.set({ data: null, error: true })
      }
    }, { allowSignalWrites: true })
  }

  public previousOrNextPage(page: number): void {
    this.filterService.setCurrentPage(this.currentPage() + (page));
  }
  public getMaxPages(max: number): number {
    return Math.ceil(max / 8);
  }
}

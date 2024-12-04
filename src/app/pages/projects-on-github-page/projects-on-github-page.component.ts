import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GithubFiltersComponent } from './components/github-filters/github-filters.component';
import { GithubUserProfileComponent } from './components/github-user-profile/github-user-profile.component';
import { GithubRepositoriesComponent } from './components/github-repositories/github-repositories.component';

@Component({
  standalone: true,
  imports: [
    // components
    GithubFiltersComponent,
    GithubUserProfileComponent,
    GithubRepositoriesComponent

  ],
  templateUrl: './projects-on-github-page.component.html',
  styleUrl: './projects-on-github-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsOnGithubPageComponent {

  /*
  * en este modulo quise usar solo señales,
  * usar toSignal y toObservable de rxjs
  * asi ver sus pro y contras
  */
  // evitar el uso de
  // this.userObservable.subscribe((data) => {
  //   this.userSignal.set(data);
  // });
  // y usar directamente toSignal



}

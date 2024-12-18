import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FiltersComponent } from './components/filters/filters.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { ProfileComponent } from './components/profile/profile.component';

@Component({
  standalone: true,
  imports: [
   FiltersComponent,
   ProfileComponent,
   RepositoriesComponent,
  ],
  templateUrl: './github-page.component.html',
  styleUrl: './github-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GithubPageComponent { }

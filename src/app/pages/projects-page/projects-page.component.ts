import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ProjectsService } from './services/projects.service';
import { User, UserState } from './interfaces';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, debounceTime, filter, forkJoin, map, switchMap, tap } from 'rxjs';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileSkeletonComponent } from './ui/user-profile-skeleton/user-profile-skeleton.component';
import { GithubRepositoriesResponse, RepositoriesState } from './interfaces/github-repositories-response.interface';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectListSkeletonComponent } from './ui/project-list-skeleton/project-list-skeleton.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputUsernameComponent } from './components/input-username/input-username.component';
import { UsernameService } from './services/username.service';



@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    CommonModule,
    UserProfileComponent,
    UserProfileSkeletonComponent,
    ProjectListComponent,
    ProjectListSkeletonComponent,
    InputUsernameComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsPageComponent {

  public username = signal<string>('');

  private userService = inject(UsernameService)
  private service = inject(ProjectsService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public user = signal<UserState>({ data: null, error: false });
  public repositories = signal<RepositoriesState>({ data: [], error: false });

  public maxPages = signal<number>(0);

  public isLayout = signal<boolean>(false);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params => params['page'] ?? '1'),
      map(page => isNaN(Number(page)) ? 1 : Number(page)),
      map(page => Math.max(1, page)),
    )
  );

  constructor() {
    effect(() => {
      if (this.user().data !== null) {
        const currentPage = this.currentPage();
        this.loadRepositories(currentPage);
      }
    }, { allowSignalWrites: true })
    effect(() => {
      const username = this.userService.getUser;
      if (username.length > 0) {

        this.username.set(username);
        this.loadProfile();
      }
    }, { allowSignalWrites: true })
  }

  public loadRepositories(page: number = 1): void {
    this.service.loadRepositories(this.username(), page)
      .pipe(
        tap(() => this.repositories.set({ data: [], error: false })),
        tap((repositories) => {
          if (repositories.length == 0) {
            this.repositories.set({ data: [], error: true })
            throw new Error('Repositorio no encontrado');
          }
          else {
            this.repositories.set({ data: repositories, error: false })
          }
        })
      ).subscribe({
        error: (err) => console.error('Error en la carga de repositorios:', err)
      });
  }

  public loadProfile(): void {

    this.service.loadUser(this.username())
      .pipe(
        tap(() => {
          this.user.set({ data: null, error: false })
          this.repositories.set({ data: [], error: false })
        }),
        tap((user) => {
          if (user == null) {
            this.user.set({ data: null, error: true })
            throw new Error('Usuario no encontrado');
          }
          else {
            this.user.set({ data: user, error: false });
            this.maxPages.set(Math.ceil(user.public_repos / 8));
          }
        }),
        tap(() => {
          if (this.currentPage()! > this.maxPages()) {
            this.router.navigateByUrl(`/projects/page/${this.maxPages()}`);
          }
        })
      ).subscribe({
        error: (err) => console.error('Error en la carga de usuario:', err)
      });
  }

  public toggleLayout(type:boolean):void{
    this.isLayout.set(type);
  }

}

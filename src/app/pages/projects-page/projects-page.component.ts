import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, Pipe } from '@angular/core';
import { ProjectsService } from './services/projects.service';
import { UserState } from './interfaces';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfileSkeletonComponent } from './ui/user-profile-skeleton/user-profile-skeleton.component';
import { RepositoriesState, Item } from './interfaces/github-repositories-response.interface';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectListSkeletonComponent } from './ui/project-list-skeleton/project-list-skeleton.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RepositoryFilterComponent } from './components/repository-filter/repository-filter.component';
import { RepositoryUserComponent } from './components/repository-user/repository-user.component';
import { RepositoriesFilterService } from './services/repositories-filter.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    CommonModule,
    UserProfileComponent,
    UserProfileSkeletonComponent,
    ProjectListComponent,
    ProjectListSkeletonComponent,
    ReactiveFormsModule,
    //
    RepositoryUserComponent,
    RepositoryFilterComponent,
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsPageComponent {


  private filterService = inject(RepositoriesFilterService);
  private service = inject(ProjectsService);

  // private route = inject(ActivatedRoute);
  // private router = inject(Router);

  public user = signal<UserState>({ data: null, error: false });
  public repositories = signal<RepositoriesState>({ data: [], error: false });

  public isLayout = signal<boolean>(false);

  public currentPage = computed(() => {
    return this.filterService.getCurrentPage();
  });

  public userLoaded = signal<boolean>(false);

  public maxPages = computed(() => {
    return this.filterService.getMaxPages();
  });


  public userNameComputed = computed(()=>{
    const userName = this.filterService.getUserName();
    return userName;
  })


  // navigation
  // public currentPage = toSignal<number>(
  //   this.route.params.pipe(
  //     map(params => params['page'] ?? '1'),
  //     map(page => isNaN(Number(page)) ? 1 : Number(page)),
  //     map(page => Math.max(1, page)),
  //   )
  // );
  constructor() {
    effect(() => {
      // si cambia el userName
      const userName = this.filterService.getUserName();
      if (userName.length > 0)this.loadUser();
    }, { allowSignalWrites: true })

    effect(() => {
      // si el user tiene datos
      if(this.userLoaded()){
        if(this.user().data !== null && this.user().error == false){
        this.loadRepositories();
        }
      }
    }, { allowSignalWrites: true })

  }

  public loadRepositories(): void {
    this.service.loadRepositories({
      userName: this.filterService.getUserName(),
      repository: this.filterService.getRepository(),
      language: this.filterService.getLanguage().toLocaleLowerCase(),
      sort: this.filterService.getSort().toLocaleLowerCase(),
      page: this.filterService.getCurrentPage()
    })
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
        }),
        // aca va el max pages
        tap(console.log)
      ).subscribe({
        error: (err) => console.error('Error en la carga de repositorios:', err)
      });
  }

  public loadUser(): void {
    this.userLoaded.set(false);
    this.service.loadUser(this.filterService.getUserName())
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
           // this.filterService.setMaxPages(Math.ceil(user.public_repos / 8));
          }
        }),
        tap(console.log)
        // navigation by route
        // tap(() => {
          // if (this.currentPage()! > this.maxPages()) {
          //   this.router.navigateByUrl(`/projects/page/${this.maxPages()}`);
          // }
        // })
      ).subscribe({
        error: (err) => console.error('Error en la carga de usuario:', err),
        complete:(()=>    this.userLoaded.set(true))
      });
  }

  public toggleLayout(type: boolean): void {
    this.isLayout.set(type);
  }

  public currentPageEvent(aa: number) {
    this.filterService.setCurrentPage(this.filterService.getCurrentPage() + (aa));
  }

}

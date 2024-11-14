import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProjectsService } from './services/projects.service';
import { GithubUserResponse } from './interfaces/github-user-response.interface';


@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsPageComponent implements OnInit {


  // private id = 129390499;
  private userName = 'juandavyc';
  private service = inject(ProjectsService);

  public user = signal<GithubUserResponse | null>(null);

  ngOnInit(): void {

  }


  public loadProfile(): void {
    this.service.loadProfile(this.userName)
      .subscribe(
        (resp) => {
          this.user.set(resp)
        }
      )
  }

}

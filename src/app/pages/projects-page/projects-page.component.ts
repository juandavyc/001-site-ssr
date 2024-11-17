import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProjectsService } from './services/projects.service';
import { User } from './interfaces';
import { BadgeComponent } from '../../shared/badge/badge.component';


@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    CommonModule,
    // test
    BadgeComponent
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsPageComponent implements OnInit {

  // private id = 129390499;
  private userName = 'juandavyc';
  private service = inject(ProjectsService);

  public user = signal<User | null>(null);
  public repositories = signal<any | null>(null);

  ngOnInit(): void {

  }

  public loadRepositories():void{
    this.service.loadRepositories(this.userName)
    .subscribe(
      (resp) => {
        this.repositories.set(resp)
      }
    )
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

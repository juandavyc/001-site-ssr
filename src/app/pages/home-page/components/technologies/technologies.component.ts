import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BadgeComponent } from '../../../../shared/badge/badge.component';
import { Technology } from './interfaces/technology.interface';

@Component({
  selector: 'technologies',
  standalone: true,
  imports: [
    CommonModule,
    BadgeComponent
  ],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologiesComponent {

  public fakeResponse:Technology[] =[
    {
      icon: 'fa-brands fa-angular',
      name: 'Angular'
    },
    {
      icon: 'fa-brands fa-react',
      name: 'React'
    },
    {
      icon: 'fa-solid fa-power-off',
      name: 'Spring Boot'
    },
    {
      icon: 'fa-brands fa-php',
      name: 'php'
    },
    {
      icon: 'fa-solid fa-database',
      name: 'MySQL - SQL Server - PostgreSQL'
    }
  ]
}


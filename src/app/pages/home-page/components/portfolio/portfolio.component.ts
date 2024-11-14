import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioCardComponent } from './components/portfolio-card/portfolio-card.component';
import { Portfolio } from './interfaces/portfolio.interface';

@Component({
  selector: 'portfolio',
  standalone: true,
  imports: [
    CommonModule,
    PortfolioCardComponent
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {

  public fakeResponse:Portfolio[] = [
    {
      id: 1,
      title: 'Helix CallCenter',
      technologies: [
        {
          icon: 'fa-brands fa-angular',
          name: 'Angular'
        },
      ],
      description: 'A dummy data free and documented API generator to facilitate the process of testing the front-end portion of projects. 1',
      urls: [
        {
          icon: 'fa-brands fa-github',
          url: 'www.google.com',
          title: 'Repositorio'
        },
        {
          icon: 'fa-solid fa-link',
          url: 'www.google.com',
          title: 'Live demo'
        }
      ]
    },
    {
      id: 2,
      title: 'Previ Reportes',
      technologies: [
        {
          icon: 'fa-brands fa-angular',
          name: 'Angular'
        },
        {
          icon: 'fa-power-off fa-solid',
          name: 'Spring Boot'
        },
      ],
      description: 'A dummy data free and documented API generator to facilitate the process of testing the front-end portion of projects. 2',
      urls: [
        {
          icon: 'fa-brands fa-github',
          url: 'www.google.com',
          title: 'Repositorio frontend'
        },
        {
          icon: 'fa-brands fa-github',
          url: 'www.google.com',
          title: 'Repositorio backend'
        },
        {
          icon: 'fa-solid fa-link',
          url: 'www.google.com',
          title: 'Live demo'
        }
      ]
    },
    {
      id: 3,
      title: 'Motos',
      technologies: [
        {
          icon: 'fa-power-off fa-solid',
          name: 'Spring Boot'
        },
      ],
      description: 'A dummy data free and documented API generator to facilitate the process of testing the front-end portion of projects. 3',
      urls: [
        {
          icon: 'fa-brands fa-github',
          url: 'www.google.com',
          title: 'Repositorio'
        },
        {
          icon: 'fa-solid fa-link',
          url: 'www.google.com',
          title: 'Live demo'
        }
      ]
    }
  ];

}

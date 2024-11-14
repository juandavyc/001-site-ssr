import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Technology } from '../../../technologies/interfaces/technology.interface';
import { UrlPortfolio } from '../../interfaces/portfolio.interface';
import { BadgeComponent } from '../../../../../../shared/badge/badge.component';

@Component({
  selector: 'portfolio-card',
  standalone: true,
  imports: [
    CommonModule,
    BadgeComponent
  ],
  templateUrl: './portfolio-card.component.html',
  styleUrl: './portfolio-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioCardComponent {

  public id = input.required<Number>();
  public title = input.required<String>();
  public technologies = input<Technology[]>();
  public description = input.required<String>();
  public urls = input.required<UrlPortfolio[]>();

}

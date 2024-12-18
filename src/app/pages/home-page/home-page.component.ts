import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { SkillsComponent } from './components/skills/skills.component';
import { HobbiesComponent } from './components/hobbies/hobbies.component';
// import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';
import { NoteComponent } from './components/note/note.component';
import { SeoService } from '../../shared/services/seo.service';
import { SEO_CONSTANTS } from '../../config/constants';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroSectionComponent,
    SkillsComponent,
    TechnologiesComponent,
    // PortfolioComponent,
    HobbiesComponent,
    NoteComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent {

  private seo = inject(SeoService);

  constructor() {
    this.seo.setSeoMetadata(SEO_CONSTANTS.home);
  }

}

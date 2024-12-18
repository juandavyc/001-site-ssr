import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';
import { SEO_CONSTANTS } from '../../config/constants';

@Component({
  standalone: true,
  imports: [
   RouterModule
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsPageComponent {

  private seo = inject(SeoService);

  constructor() {
    this.seo.setSeoMetadata(SEO_CONSTANTS.projects);
  }

}

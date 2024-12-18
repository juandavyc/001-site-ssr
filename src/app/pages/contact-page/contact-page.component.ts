import { ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';
import { SEO_CONSTANTS } from '../../config/constants';
@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent {

  private seo = inject(SeoService);
  constructor(){
    this.seo.setSeoMetadata(SEO_CONSTANTS.contact);
  }

}

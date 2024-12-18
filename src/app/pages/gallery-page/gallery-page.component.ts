
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { GalleryFetchState, Highlight, Profile, Publication } from './interfaces/gallery-response.interface';
import { PublicationsComponent } from './components/publications/publications.component';
import { GalleryService } from './services/gallery.service';
import { SeoService } from '../../shared/services/seo.service';
import { SEO_CONSTANTS } from '../../config/constants';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [
    CommonModule,
    UserProfileComponent,
    HighlightsComponent,
    PublicationsComponent,
  ],
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GalleryPageComponent {

  private seo = inject(SeoService);

  private service = inject(GalleryService);

  public galleryData = signal<GalleryFetchState | null>(null);

  public user = computed(() => this.service.user());

  public profile = computed(() => this.galleryData()?.data?.profile ?? null);
  public highlights = computed(() => this.galleryData()?.data?.highlights ?? []);
  public publications = computed(() => this.galleryData()?.data?.publications ?? []);

  constructor() {
    this.seo.setSeoMetadata(SEO_CONSTANTS.gallery);
    effect(() => {
      const tempUser = this.service.user();
      if (tempUser) {
        const tempData = this.service.userSignal();
        this.galleryData.set(tempData);
      }
    }, { allowSignalWrites: true })
  }

  public toggleUser() {
    this.service.user.update(value => (value === 'noah') ? 'juandavyc' : 'noah');
  }

}

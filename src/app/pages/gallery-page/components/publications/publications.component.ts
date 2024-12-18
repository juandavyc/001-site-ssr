import { ChangeDetectionStrategy, Component, computed, input, output, signal, viewChild } from '@angular/core';
import { Content, Publication } from '../../interfaces/gallery-response.interface';
import { NoImagePipe } from '../../../../shared/pipes/noImage.pipe';
import { PublicationTypePipe } from '../../../../shared/pipes/publicationType.pipe';
import { CommonModule } from '@angular/common';
import { PhotoVideoCarouselComponent } from '../../../../shared/components/photoVideoCarousel/photoVideoCarousel.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { GithubCodeComponent } from '../../../../shared/components/github-code/github-code.component';
import { REPOSITORY_URLS } from '../../../../config/constants';
import { PublicationSkeletonComponent } from '../../ui/publication-skeleton/publication-skeleton.component';
import { MediaUrlPipe } from '../../../../shared/pipes/mediaUrl.pipe';

export interface CurrentPublication {
  id: number;
  title: string;
  description: string;
  created: string;
  type: string;
  likes: number;
}


@Component({
  selector: 'publications',
  standalone: true,
  imports: [
    CommonModule,
    PublicationSkeletonComponent,
    // shared components
    PhotoVideoCarouselComponent,
    ModalComponent,
    GithubCodeComponent,
    // pipes
    MediaUrlPipe,
    NoImagePipe,
    PublicationTypePipe,
  ],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicationsComponent {

  public readonly url = REPOSITORY_URLS.gallery.publications;

  public data = input.required<Publication[] | []>();
  public user = input.required<string>();

  public current = signal<CurrentPublication | null>(null);
  public multimedia = signal<Content[] | []>([]);

  private myModal = viewChild<ModalComponent>('myModal');

  public sortedData = computed(() => {
    const pinned = this.data().filter(pub => pub.type === 'pinned');
    const unPinned = this.data().filter(pub => pub.type !== 'pinned');
    return pinned.concat(unPinned);
  })

  public show(id: number): void {
    const temp = this.sortedData().find(pub => pub.id == id);
    if (temp) {
      const { id: pubId, multimedia: { content }, ...rest } = temp;
      this.multimedia.set(content);
      this.current.set({ id: pubId, ...rest });
      this.myModal()!.open();
    }
    else {
      this.multimedia.set([]);
      this.current.set(null);
    }
  }
  public finished() {
    this.multimedia.set([]);
  }
}

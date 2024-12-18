import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal, viewChild } from '@angular/core';
import { Content, Highlight } from '../../interfaces/gallery-response.interface';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { TimedCarouselComponent } from '../../../../shared/components/timedCarousel/timedCarousel.component';
import { GithubCodeComponent } from '../../../../shared/components/github-code/github-code.component';
import { REPOSITORY_URLS } from '../../../../config/constants';
import { HighlightsSkeletonComponent } from '../../ui/highlights-skeleton/highlights-skeleton.component';
import { NoImagePipe } from '../../../../shared/pipes/noImage.pipe';
import { MediaUrlPipe } from '../../../../shared/pipes/mediaUrl.pipe';

@Component({
  selector: 'highlights',
  standalone: true,
  imports: [
    CommonModule,
    HighlightsSkeletonComponent,
    //shared
    ModalComponent,
    TimedCarouselComponent,
    GithubCodeComponent,
    // pipes
    MediaUrlPipe,
    NoImagePipe,
  ],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightsComponent {

  public readonly url = REPOSITORY_URLS.gallery.highlights;

  public data = input.required<Highlight[] | []>();
  public user = input.required<string>();

  public multimedia = signal<Content[] | []>([]);

  public myModal = viewChild<ModalComponent>('myModal');
  public myTimed = viewChild<TimedCarouselComponent>('myTimed');

  public show(id: number): void {
    const highlight = this.data()
    .filter(hg => hg.id == id)
    .map(hg => hg.multimedia.content)
    .shift();

    if(highlight){
      this.multimedia.set(highlight);
      this.myModal()!.open();

    }
  }

  public finished(): void {
    this.multimedia.set([]);
  }

  public finishedTimed() {
   this.multimedia.set([]);
   this.myModal()!.close();
  }
}

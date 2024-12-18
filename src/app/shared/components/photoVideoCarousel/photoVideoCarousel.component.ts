import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { Content } from '../../../pages/gallery-page/interfaces/gallery-response.interface';
import { MediaUrlPipe } from '../../pipes/mediaUrl.pipe';

interface Current {
  index: number;
  max: number;
  arr: number[];
}

@Component({
  selector: 'photo-video-carousel',
  standalone: true,
  imports: [
    MediaUrlPipe
  ],
  templateUrl: './photoVideoCarousel.component.html',
  styleUrl: './photoVideoCarousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoVideoCarouselComponent {

  private currentInitial = { index: 0, max: 0, arr: [] };
  public current = signal<Current>(this.currentInitial);

  public multimedia = input<Content[] | []>([]);
  public user = input.required<string>();

  public multimediaContent = signal<Content | null>(null);

  public isFinished = output<void>();
  public isChanged = output<number>();

  constructor() {
    effect(() => {
      const temp = this.multimedia();
      if (temp.length > 0) {
        const max = temp.length;
        this.current.set({
          index: 0,
          max: max - 1,
          arr: Array.from({ length: max }, (_, i) => i),
        });
        return;
      }
      this.current.set({ index: 0, max: 0, arr: [], });
    }, { allowSignalWrites: true });

    effect(() => {
      const { index, max } = this.current();
      if (this.current() !== this.currentInitial && this.multimedia().length > 0) {
        if (index >= 0 && index <= max) {
          const content = this.multimedia()[index] || null;
          this.multimediaContent.set(content);
          this.changed(index);
          return;
        }
        return;
      }
      this.multimediaContent.set(null);
    }, { allowSignalWrites: true })
  }

  public previous(): void {
    if (this.current().index > 0) {
      this.current.update(({ index, max, arr }) => ({ index: index - 1, max, arr }));
    }
  }

  public next(): void {
    const { index, max } = this.current();
    if (index < max) {
      this.current.update(({ index, max, arr }) => ({ index: index + 1, max, arr }));
    }
    else {
      this.finished();
    }
  }
  public changed(index: number): void {
    this.isChanged.emit(index);
  }
  public finished(): void {
    this.isFinished.emit();
  }
}

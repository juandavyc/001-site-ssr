import { ChangeDetectionStrategy, Component, input, OnDestroy, output, signal, viewChild } from '@angular/core';
import { PhotoVideoCarouselComponent } from '../photoVideoCarousel/photoVideoCarousel.component';
import { Content } from '../../../pages/gallery-page/interfaces/gallery-response.interface';
import { interval, map, merge, Subject, Subscription, takeUntil, tap } from 'rxjs';


@Component({
  selector: 'timed-carousel',
  standalone: true,
  imports: [
    PhotoVideoCarouselComponent
  ],
  templateUrl: './timedCarousel.component.html',
  styleUrl: './timedCarousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimedCarouselComponent implements OnDestroy {

  public count = signal<number>(0);
  public user = input.required<string>();

  public multimedia = input<Content[] | []>([]);
  public myCarousel = viewChild<PhotoVideoCarouselComponent>('myCarousel');

  public progress = signal<number>(0);

  private readonly _stop = new Subject<void>();
  private readonly _start = new Subject<void>();

  private timerAndProgress$: Subscription | null = null;
  public isFinished = output<void>();


  public start(): void {
    this._start.next();

    this.timerAndProgress$ = merge
      (
        (
          interval(31).pipe(
            takeUntil(this._stop),
            map((_, index) => (index + 1) * (100 / (2000 / 19))),
            tap(value => this.progress.set(Math.min(value, 100))),
          )
        ),
        (
          interval(4000).pipe(
            takeUntil(this._stop),
            tap((x) => {
              if (this.myCarousel()) {
                this.myCarousel()!.next();
              }
            }),
          )
        )
      ).subscribe();

  }

  public stop(): void {
    this._stop.next();
    this.timerAndProgress$ = null;
  }

  public finished() {
    this.stop();
    this.isFinished.emit();
  }

  public isChanged(count: number) {
    this.stop();
    this.start();
    this.progress.set(0)
    this.count.set(count);
  }

  ngOnDestroy(): void {

    if (this.timerAndProgress$) {
      this.timerAndProgress$.unsubscribe();
    }
  }
}

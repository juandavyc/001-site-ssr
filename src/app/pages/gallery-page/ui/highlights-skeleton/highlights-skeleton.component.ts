import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'highlights-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './highlights-skeleton.component.html',
  styleUrl: './highlights-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightsSkeletonComponent { }

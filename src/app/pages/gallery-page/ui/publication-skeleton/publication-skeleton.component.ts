import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'publication-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './publication-skeleton.component.html',
  styleUrl: './publication-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicationSkeletonComponent { }

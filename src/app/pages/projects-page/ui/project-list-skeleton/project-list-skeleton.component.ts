import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'project-list-skeleton',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './project-list-skeleton.component.html',
  styleUrl: './project-list-skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListSkeletonComponent { }

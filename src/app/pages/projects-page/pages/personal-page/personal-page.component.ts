import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-personal-page',
  standalone: true,
  imports: [],
  templateUrl: './personal-page.component.html',
  styleUrl: './personal-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalPageComponent { }

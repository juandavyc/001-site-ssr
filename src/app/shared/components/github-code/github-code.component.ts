import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'github-code',
  standalone: true,
  imports: [],
  templateUrl: './github-code.component.html',
  styleUrl: './github-code.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubCodeComponent {
  public url = input.required<string>();
}

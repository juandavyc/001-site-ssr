import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent {

}

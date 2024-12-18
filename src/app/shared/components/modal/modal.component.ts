import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {

  public isOpen = signal<boolean>(false);
  public finished = output<void>();

  public open():void{
    this.isOpen.set(true);
  }
  public close():void{
    this.isOpen.set(false);
    this.finished.emit();
  }
}

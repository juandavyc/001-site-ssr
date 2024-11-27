import { ChangeDetectionStrategy, Component, input, output, computed, effect, signal, inject } from '@angular/core';
import { UsernameService } from '../../services/username.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'input-username',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './input-username.component.html',
  styleUrl: './input-username.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputUsernameComponent {

  // servicio
  private userService = inject(UsernameService);

  public searchInput = new FormControl(this.userService.getUser,[
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15)
  ]);
  public username = signal(this.searchInput);

  constructor() {
    effect(() => {
      this.searchInput.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(user=>{
        this.userService.setUser(user ?? 'juandavyc');
      })
    }, { allowSignalWrites: true })
  }

  // private REGEX = /^[a-zA-Z0-9]+$/;

  // public outputUsername = output<string>();
  // public username = input.required<string>();
  // public usernameInternal = signal<string>('');

  // constructor(){
  //   effect(()=>{
  //     this.usernameInternal.set(this.username());
  //   },{
  //     allowSignalWrites:true
  //   })
  // }

  // public isValid = computed<boolean>(() => {
  //   const value = this.username();
  //   return value.length >= 3 && value.length <= 10 && this.REGEX.test(value);
  // })

  // public onUsernameChange(target: any): void {
  //   const newValue = target.value;
  //   if (this.isValid()) {
  //     this.outputUsername.emit(newValue);
  //   }
  // }
}

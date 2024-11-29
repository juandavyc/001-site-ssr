import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { RepositoriesFilterService } from '../../services/repositories-filter.service';
import { FormControl, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'repository-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './repository-user.component.html',
  styleUrl: './repository-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryUserComponent {

  private filterService = inject(RepositoriesFilterService);
  private formBuilder = inject(FormBuilder);

  public myForm = this.formBuilder.group({
    userName: [this.filterService.getUserName(), [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ]]
  });

  public repositoryaa = computed(()=>{
    return this.filterService.getRepository();
  })

  constructor() {
    effect(() => {
      this.myForm.valueChanges
        .pipe(
          debounceTime(1000),
          distinctUntilChanged()
        ).subscribe(({ userName }) => {
          this.filterService.resetFilter();
          this.filterService.resetService();
          this.filterService.setUserName(userName ?? '');
        })
    }, { allowSignalWrites: true })
  }


}

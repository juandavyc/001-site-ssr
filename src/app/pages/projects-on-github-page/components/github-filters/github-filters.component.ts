import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgrammingLanguagesFilter, SortFilter } from '../../enums';
import { GithubFiltersService } from '../../services/github-filters.service';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';


interface SearchParams {
  userName?: string;
  repository?: string;
  language?: string;
  sort?: string;
}

@Component({
  selector: 'github-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './github-filters.component.html',
  styleUrl: './github-filters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubFiltersComponent {



  private service = inject(GithubFiltersService);

  private formBuilder = inject(FormBuilder);

  public programmingLanguages = ProgrammingLanguagesFilter;
  public sortFilter = SortFilter;

  public searchParams = computed<SearchParams>(() => (
    {
      userName: this.service.getUserName(),
      repository: this.service.getRepository(),
      language: this.service.getLanguage(),
      sort: this.service.getSort(),
    }
  ));

  public hasAtLeastTwoValues = computed<boolean>(() => {
   if(this.service.isLoadedUser()){
    const params = this.searchParams();
    const keys = Object.keys(params) as (keyof SearchParams)[];
    return keys.filter(key => params[key]).length >= 2;
   }
   else{
    return false;
   }
  })


  public myForm: FormGroup = this.formBuilder.group({
    userName: [
      this.service.getUserName(),
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ]
    ],
    repository: [
      this.service.getRepository(),
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]
    ],
    language: [this.service.getLanguage(), [Validators.required]],
    sort: [this.service.getSort(), [Validators.required]],
  })

  private formChanges = toSignal(
    this.myForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    )
  );

  constructor() {
    effect(() => {
      if (this.formChanges()) {
        const data = this.formChanges();
        if (data) {
          this.formSearch(data);
        }
      }
    }, { allowSignalWrites: true })

  }

  public formSearch(data: any): void {

    if (data.userName && this.service.getUserName() !== data.userName) {
      this.service.isLoadedUser.set(false);
      this.service.setUserName(data.userName);
      this.resetForm();
    } else {
      this.service.resetFilter();
      if (data.repository) {
        this.service.setRepository(data.repository);
      }
      if (data.language) {
        this.service.setLanguage(data.language);
      }
      if (data.sort) {
        this.service.setSort(data.sort);
      }
    }

  }
  // reset form
  public resetForm(): void {
    this.service.resetFilter();
    this.myForm.reset({
      userName: this.service.getUserName(),
      repository: this.service.getRepository(),
      language: this.service.getLanguage(),
      sort: this.service.getSort(),
    });
  }

  public setGridView(value: boolean): void {
    this.service.isGridView.set(value);
  }

  public getGridView(): boolean {
    return this.service.isGridView()
  }


}

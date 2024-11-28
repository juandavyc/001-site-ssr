
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { concat, debounceTime, distinctUntilChanged } from 'rxjs';
import { ProgrammingLanguages, SortResults } from '../../enums';
import { RepositoriesFilterService } from '../../services/repositories-filter.service';

@Component({
  selector: 'repository-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './repository-filter.component.html',
  styleUrl: './repository-filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryFilterComponent {

  private formBuilder = inject(FormBuilder);

  private filterService = inject(RepositoriesFilterService);

  public languages = ProgrammingLanguages;
  public sortResults = SortResults;

  public searchMessage = signal<string>('');

  public repositoryComputed = computed(() => {
    return this.filterService.getRepository() ?? '';
  })
  public languagesComputed = computed(() => {
    return this.filterService.getLanguage() ?? '';
  });
  public sortComputed = computed(() => {
    return this.filterService.getSort() ?? '';
  });

  public userNameComputed = computed(() => {
    return this.filterService.getUserName();
  });


  public myForm: FormGroup = this.formBuilder.group({
    repository: [
      this.repositoryComputed(),
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]
    ],
    language: [this.languagesComputed(), [Validators.required]],
    sort: [this.sortComputed(), [Validators.required]],
  });

  constructor() {

    effect(()=>{
      if(this.filterService.isResetFilter()){
        this.resetForm();
      }
    },{allowSignalWrites:true})

    effect(() => {
      this.myForm.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe(({ repository, language, sort }) => {
        this.setSearchMessage(repository, language, sort);
      });
    })
  }

  public setSearchMessage(repository: string, language: string, sort: string): void {
    this.searchMessage.set('')
    if (repository) {
      this.searchMessage.update(msg => msg.concat(' Repositorios de Nombre: "', repository, '"'));
      this.filterService.setRepository(repository);
    }
    if (language) {
      this.searchMessage.update(msg => msg.concat(' Lenguaje: "', this.getValueEnum(this.languages, language), '"'));
      this.filterService.setLanguage(language);
    }
    if (sort) {
      this.searchMessage.update(msg => msg.concat(' Ordenar por: "', this.getValueEnum(this.sortResults, sort), '"'));
      this.filterService.setSort(sort);
    }
  }

  private getValueEnum(myEnum: any, tag: string): string {
    if (tag in myEnum) {
      return myEnum[tag as keyof typeof myEnum];
    }
    else {
      return 'Error';
    }
  }

  public resetForm(): void {
    this.searchMessage.set('');
    // this.myForm.reset({
    //   repository: '',
    //   language: '',
    //   sort: ''
    // });
    this.filterService.resetFilter();
  }

}


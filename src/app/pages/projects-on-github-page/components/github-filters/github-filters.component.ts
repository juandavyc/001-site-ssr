import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgrammingLanguagesFilter, SortFilter } from '../../enums';
import { GithubFiltersService } from '../../services/github-filters.service';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { User } from '../../../projects-page/interfaces/user.interface';
import { toSignal } from '@angular/core/rxjs-interop';

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

  private filterService = inject(GithubFiltersService);

  private formBuilder = inject(FormBuilder);

  public programmingLanguages = ProgrammingLanguagesFilter;
  public sortFilter = SortFilter;

  public myForm: FormGroup = this.formBuilder.group({
    userName: [
      this.filterService.getUserName(),
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ]
    ],
    repository: [
      this.filterService.getRepository(),
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]
    ],
    language: [this.filterService.getLanguage(), [Validators.required]],
    sort: [this.filterService.getSort(), [Validators.required]],
  })

  private formChanges = toSignal(

    this.myForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    )
  );

  constructor() {
    effect(() => {
      if(this.formChanges()){
        const { userName, repository, language, sort } = this.formChanges();
        this.setSearchMessage(userName, repository, language, sort);
      }
    }, { allowSignalWrites: true })

  }

  public setSearchMessage(userName: string, repository: string, language: string, sort: string): void {

    if (userName && this.filterService.getUserName() !== userName) {
      this.filterService.isLoadedUser.set(false);
      this.filterService.setUserName(userName);
      this.resetForm();
    }else{
      this.filterService.resetFilter();
      if (repository) {
        // this.searchMessage.update(msg => msg.concat(' Repositorios de Nombre: "', repository, '"'));
        this.filterService.setRepository(repository);
      }
      if (language) {
        //this.searchMessage.update(msg => msg.concat(' Lenguaje: "', this.getValueEnum(this.languages, language), '"'));
        this.filterService.setLanguage(language);
      }
      if (sort) {
        //this.searchMessage.update(msg => msg.concat(' Ordenar por: "', this.getValueEnum(this.sortResults, sort), '"'));
        this.filterService.setSort(sort);
      }
    }

  }
  // reset form
  public resetForm() {
    this.filterService.resetFilter();
    this.myForm.reset({
      userName: this.filterService.getUserName(),
      repository: this.filterService.getRepository(),
      language: this.filterService.getLanguage(),
      sort: this.filterService.getSort(),
    });
  }


}

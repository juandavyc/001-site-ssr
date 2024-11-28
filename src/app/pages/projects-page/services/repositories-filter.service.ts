import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesFilterService {

  // usuario que se buscaran los repositorios
  private userName = signal<string>('juandavyc');
  // filtros del formulario
  private repository = signal<string>('');
  private language = signal<string>('');
  private sort = signal<string>('');
  //
  private currentPage = signal<number>(1);
  private maxPages = signal<number>(1);

  public isResetFilter = signal<boolean>(false);

  constructor() {

  }

  // setters
  public getUserName(): string {
    return this.userName();
  }

  public getRepository(): string {
    return this.repository();
  }

  public getLanguage(): string {
    return this.language();
  }

  public getSort(): string {
    return this.sort();
  }

  public getCurrentPage(): number {
    return this.currentPage();
  }
  public getMaxPages(): number {
    return this.maxPages();
  }

  // Setters
  public setUserName(value: string): void {
    this.userName.set(value);
  }

  public setRepository(value: string): void {
    this.repository.set(value);
  }

  public setLanguage(value: string): void {
    this.language.set(value);
  }

  public setSort(value: string): void {
    this.sort.set(value);
  }

  public setCurrentPage(value: number): void {
    this.currentPage.set(value);
  }
  public setMaxPages(value: number): void {
    this.maxPages.set(value);
  }

  public resetFilter(): void {
    this.isResetFilter.set(true)
    this.setRepository('');
    this.setLanguage('');
    this.setSort('');
    setTimeout(() => {
      this.isResetFilter.set(false)
    }, 500)
  }

  public resetService(): void {
    //console.log("resetService");
    //this.setUserName('');
    this.setCurrentPage(1);
    this.setMaxPages(1);
    //this.isResetFilter.set(false);
  }

}

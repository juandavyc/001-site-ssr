import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {
  private _username = signal<string>('juandavyc');
  constructor() {}

  public setUser(username: string): void {
    this._username.set(username);
  }
  public get getUser(): string {
    return this._username();
  }
}

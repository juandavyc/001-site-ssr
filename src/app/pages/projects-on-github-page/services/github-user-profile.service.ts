import { inject, Injectable, signal } from '@angular/core';
import { catchError, concat, delay, filter, map, Observable, of, skip, switchMap, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { GithubUserResponse, UserFetchState, } from '../interfaces';



@Injectable({
  providedIn: 'root'
})
export class GithubUserProfileService {

  private readonly API = 'https://api.github.com/users';
  private readonly API_FAKE = '/data/fakeUser.json';

  private http = inject(HttpClient);
  public userName = signal<string>('');

  private userRequest$ = toObservable<string>(this.userName).pipe(
    skip(1),
    filter(userName => !!userName),
    switchMap<string, Observable<UserFetchState>>(
      (userName) =>
        concat(
          of({ data: null, error: false }),
          this.fetchUserData(userName)
        )
    )
  );

  private fetchUserData(userName: string): Observable<UserFetchState> {
    const safeUserName = encodeURIComponent(userName);
    const url = `${this.API}/${safeUserName}`;
    //const url = `${this.API_FAKE}`;
    //console.log(url,userName);
    return this.http.get<GithubUserResponse>(url).pipe(
      //tap(console.log),
      map((data) => ({ data, error: false })),
      catchError(() => of({ data: null, error: true }))
    )
  }

  public userSignal = toSignal(this.userRequest$, {
    initialValue: { data: null, error: false }
  });

}

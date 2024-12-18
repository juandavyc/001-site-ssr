import { inject, Injectable, signal } from '@angular/core';
import { catchError, concat, filter, map, Observable, of, skip, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { GithubUserResponse, UserFetchState, } from '../interfaces';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  private readonly API = environment.GIT_URL_PROFILE;

  private http = inject(HttpClient);
  public userName = signal<string>('');

  private userRequest$ = toObservable<string>(this.userName).pipe(
    skip(1),
    filter(userName => !!userName),
    //debounceTime(5000),
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

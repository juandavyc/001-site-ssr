import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { catchError, concat, concatMap, delay, filter, map, Observable, of, skip, switchMap, tap } from 'rxjs';
import { GithubFiltersService } from './github-filters.service';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { User, UserState } from '../../projects-page/interfaces';



@Injectable({
  providedIn: 'root'
})
export class GithubUserProfileService {

  private readonly API = 'https://api.github.com';
  private http = inject(HttpClient);
  public userName = signal<string>('');

  //  this.http.get(`${this.API}/users/${userName}`)

  public getUserData = toSignal(
    toObservable(this.userName).pipe(
     // skip(1),
      switchMap(userName =>
        concat(
          of({ data: null, error: false }),
          this.http.get('/data/fakeUser.json').pipe(
            map(data => ({ data, error: false })),
            catchError((error) => of({ data: null, error: true }))
          )
        )
      )
    ),
    { initialValue: {data:null, error:false} }
  );
}

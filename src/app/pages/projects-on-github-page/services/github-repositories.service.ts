import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, concat, delay, map, Observable, of, skip, startWith, switchMap, tap } from 'rxjs';
import { GithubRepositoriesResponse, RepositoriesFetchState } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GithubRepositoriesService {

  private readonly API = 'https://api.github.com/search/repositories';
  private readonly API_FAKE = '/data/fakeRepositories.json';
  private http = inject(HttpClient);

  public form = signal<any>(
    {
      userName: 'juandavyc',
      repository: '',
      language: '',
      sort: '',
      page: 1,
    }
  );

  private fetchRepositoriesData(url:string): Observable<RepositoriesFetchState> {
    //
   // console.log(this.API_FAKE,{params});
    return this.http.get<GithubRepositoriesResponse>(url).pipe(
      //delay(1000),
      map((response) => {
        if (response && response.items) {
          return { data: response, error: false };
        }
        else {
          return { data: null, error: true };
        }
      }),
      //tap(console.log),
      catchError(() => of({ data: null, error: true }))
    )
  }

  private repositoriesRequest$ = toObservable(this.form).pipe(
    skip(1),
    map(({ userName, repository, language, sort, page }) => {

      const rep = repository ? `+${repository}` : '';
      const lan = language ? `+language:${language}` : '';
      const sor = sort ? `&sort=${sort}` : '&sort=updated';

      const url = `${this.API}?q=user:${userName}${rep}${lan}&page=${page}&per_page=8${sor}&order=desc`;

      return url;
      //return '/data/fakeRepositories.json';
    }),
    switchMap((params: string) => (
     concat(
      of({ data: null, error: false }),
      this.fetchRepositoriesData(params)
     )
    ))
  );

  public repositoriesSignal = toSignal(this.repositoriesRequest$,
    { initialValue: { data: null, error: false } }
  )

}

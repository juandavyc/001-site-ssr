import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, concat, map, of, skip, switchMap, tap } from 'rxjs';
import { GithubUserResponse } from '../../projects-page/interfaces';
import { GithubRepositoriesResponse } from '../../projects-page/interfaces/github-repositories-response.interface';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class GithubRepositoriesService {

  private readonly API = 'https://api.github.com';

  private http = inject(HttpClient);

  public form = signal<any>(
    {
      userName: 'juandavyc',
      repository: '',
      language: '',
      sort: '',
    }
  );

  public data = toSignal(
    toObservable(this.form).pipe(
      skip(1),
      map(({userName,repository,language,sort}) => {
        let query = `user:${userName}`;
        if (repository) {
          query += `+${repository}`;
        }
        if (language) {
          query += `+language:${language}`;
        }
        const pageOrder = `page=${1}&per_page=8&sort=${sort}&order=desc`;
        const url = `${this.API}/search/repositories?q=${query}&${pageOrder}`;
        return url;
        //return '/data/fakeRepositories.json';
      }),
      switchMap(url =>
        concat(
          of({ data: [], error: false }),
          this.http.get<GithubRepositoriesResponse>(url).pipe(
            map(data => ({ data: data.items, error: false })),
            catchError((error) => of({ data: [], error: true }))
          )
        )
      )
    ), { initialValue: { data: [], error: false } }
  )
}

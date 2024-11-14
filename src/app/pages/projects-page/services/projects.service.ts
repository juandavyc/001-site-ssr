import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GithubUserResponse } from '../interfaces/github-user-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private API = 'https://api.github.com/users';
  private http = inject(HttpClient);

  // for testing only
  private fakeUserResponse = {
    "login": "juandavyc",
    "id": 129390499,
    "node_id": "U_kgDOB7ZXow",
    "avatar_url": "https://avatars.githubusercontent.com/u/129390499?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/juandavyc",
    "html_url": "https://github.com/juandavyc",
    "followers_url": "https://api.github.com/users/juandavyc/followers",
    "following_url": "https://api.github.com/users/juandavyc/following{/other_user}",
    "gists_url": "https://api.github.com/users/juandavyc/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/juandavyc/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/juandavyc/subscriptions",
    "organizations_url": "https://api.github.com/users/juandavyc/orgs",
    "repos_url": "https://api.github.com/users/juandavyc/repos",
    "events_url": "https://api.github.com/users/juandavyc/events{/privacy}",
    "received_events_url": "https://api.github.com/users/juandavyc/received_events",
    "type": "User",
    "user_view_type": "public",
    "site_admin": false,
    "name": "Juan Yara Cifuentes",
    "company": "Full Stack Developer",
    "blog": "juan.deimosdev.com",
    "location": "Colombia, Bogotá DC",
    "email": null,
    "hireable": null,
    "bio": "<bad-ape [says]=\"Oh noo\"/>",
    "twitter_username": null,
    "public_repos": 21,
    "public_gists": 0,
    "followers": 0,
    "following": 0,
    "created_at": "2023-03-30T11:24:59Z",
    "updated_at": "2024-11-14T18:14:25Z"
  };
  constructor() {

  }

  public loadProfile(userName: string): Observable<GithubUserResponse> {
    return this.http.get<GithubUserResponse>(`${this.API}/${userName}`).pipe(
      tap(console.log)
    )
  }


}

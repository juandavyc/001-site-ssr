import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, concat, delay, filter, map, Observable, of, skip, switchMap, tap } from 'rxjs';
import { GalleryFetchState, GalleryResponse } from '../interfaces/gallery-response.interface';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private readonly API = environment.GALLERY_URL;
  private http = inject(HttpClient);

  public user = signal<string>('juandavyc'); // noah or juandavyc

  private userRequest$ = toObservable<string>(this.user).pipe(
    //skip(1),
    filter(user => user.length > 0),
    map(user => `${this.API}/${user}.json`),
    //delay(3000),
    switchMap<string, Observable<GalleryFetchState>>(url =>
      concat(
        of({ data: null, error: false }),
        this.fetchUserData(url),
      )
    )
  )
  private fetchUserData(url: string): Observable<GalleryFetchState> {
    return this.http.get<GalleryResponse>(url).pipe(
      map((data) => ({ data, error: false })),
      catchError(() => of({ data: null, error: true }))
    );
  }

  public userSignal = toSignal(this.userRequest$, {
    initialValue: { data: null, error: false }
  });

}

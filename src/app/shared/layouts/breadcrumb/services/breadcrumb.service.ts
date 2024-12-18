import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}
@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService implements OnDestroy {

  public breadcrumb = signal<Breadcrumb[]>([]);
  private router = inject(Router);
  private breadcrumb$: Subscription;
  private activatedRoute = inject(ActivatedRoute);

  constructor() {

    this.breadcrumb$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      this.breadcrumb.set([]);
      if (!['/home', '/'].includes(this.router.url)) {
        this.breadcrumb.set([{ label: 'Home', url: '/' }, ...this.create(this.activatedRoute)]);
      }
    })
  }
  private create(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }
    children.forEach((child) => {
      const routeURL: string = child.snapshot.url.map(seg => seg.path).join('/')
      if (routeURL) {
        url += `/${routeURL}`;
      }
      breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], url });
      return this.create(child, url, breadcrumbs);
    })
    return breadcrumbs;
  }

  ngOnDestroy(): void {
    this.breadcrumb$.unsubscribe();
  }


}

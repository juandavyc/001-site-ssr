import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home-page/home-page.component')
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects-page/projects-page.component')
  },
  // {
  //   path: 'projects/page/:page',
  //   loadComponent: () => import('./pages/projects-page/projects-page.component')
  // },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery-page/gallery-page.component')
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

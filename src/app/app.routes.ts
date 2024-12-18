import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home-page/home-page.component'),
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'projects',
    redirectTo: 'projects/github',
    pathMatch: 'full',
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects-page/projects-page.component'),
    data: { breadcrumb: 'Projects' },
    children: [
      {
        path: 'github',
        loadComponent: () => import('./pages/projects-page/pages/github-page/github-page.component'),
        data: {
          breadcrumb: 'Github'
        }
      },
    ]
  },

  // {
  //   path: 'projects/page/:page',
  //   loadComponent: () => import('./pages/projects-page/projects-page.component')
  // },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery-page/gallery-page.component'),
    data: {
      breadcrumb: 'Gallery'
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-page/contact-page.component'),
    data: {
      breadcrumb: 'Contact'
    }
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


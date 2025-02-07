import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { DatePipe, registerLocaleData } from '@angular/common';

import { tokenHeaderInterceptor } from './auth/http/token-header.interceptor';

registerLocaleData(localeEs);

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);


export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, inMemoryScrollingFeature),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([tokenHeaderInterceptor])
    ),
    //importProvidersFrom([BrowserAnimationsModule]),
    DatePipe
  ]
};

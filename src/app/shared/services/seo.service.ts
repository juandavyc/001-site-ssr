import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

interface Seo{
  title: string;
  description : string;
  tags: string;
}

@Injectable({
  providedIn: 'root'
})

export class SeoService {

  private title = inject(Title);
  private meta = inject(Meta);

  constructor() {

  }

  public setSeoMetadata(seo: Seo) {
    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ name: 'og:title', content: seo.title });
    this.meta.updateTag({ name: 'og:description', content: seo.title });
  }
}

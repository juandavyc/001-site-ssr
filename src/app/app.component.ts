import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/layouts/navbar/navbar.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { BreadcrumbComponent } from './shared/layouts/breadcrumb/breadcrumb.component';
import AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  private platformId = inject(PLATFORM_ID);

  title = '001-juanda-ssr';
  ngOnInit(): void {
    // que lo cargue en el navegador
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 700,
      });
    }
  }
}

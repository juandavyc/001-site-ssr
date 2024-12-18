import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { REPOSITORY_URLS } from '../../../config/constants';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent{

  public url = REPOSITORY_URLS.home;
  // tengo pereza
  public menuItems = [
    { label: 'Inicio', route: '/home' },
    { label: 'Proyectos', route: '/projects/github' },
    { label: 'Galería', route: '/gallery' },
    { label: 'Contacto', route: '/contact' },
  ];
  // mobile
  public isMenuOpen = signal<boolean>(false);

  public toggleMenu(): void {
    this.isMenuOpen.update(val => !val);
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  private onResize(width:number){
    if (width >= 640) {
      this.isMenuOpen.set(false);
    }
  }
}

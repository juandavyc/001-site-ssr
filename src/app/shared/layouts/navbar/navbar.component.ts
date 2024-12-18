import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
export class NavbarComponent {

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
}
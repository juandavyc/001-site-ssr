import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HobbyCardComponent } from './components/hobby-card/hobby-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hobbies',
  standalone: true,
  imports: [
    CommonModule,
    HobbyCardComponent,
    RouterLink
  ],
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HobbiesComponent {

  public fakeResponse = [
    {
      id:1,
      title: 'Motocicletas y Mecánica',
      icons:["fa-solid fa-motorcycle","fa-solid fa-wrench"],
      description: `Me apasionan las motos y la mecánica,
       disfruto mucho el manejar y la libertad de explorar nuevos lugares,
       es una gran parte de mi vida.`
    },
    {
      id:2,
      title: 'GYM',
      icons:["fa-solid fa-dumbbell","fa-solid fa-heart text-red-600"],
      description: `Voy al gimnasio todos los días, sí es posible, pero principalmente voy por salud, ademas me ayuda a mantenerme fuerte y en forma.`
    },
    {
      id:3,
      title: 'Videojuegos',
      icons:["fa-solid fa-dice","fa-solid fa-puzzle-piece"],
      description: `Me encantan los videojuegos y la ciencia ficción,
      entonces Halo y Cyberpunk 2077 son de mis favoritos.
      Pero cualquier juego que suponga desafío tipo: AGE, Stellaris :heart:  `
    }
  ]
}

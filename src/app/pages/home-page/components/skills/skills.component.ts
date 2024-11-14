import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkillCardComponent } from './components/skill-card/skill-card.component';
import { Skill } from './interfaces/skill.interface';

@Component({
  selector: 'skills',
  standalone: true,
  imports: [
    CommonModule,
    SkillCardComponent
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {

  public fakeApiResponse: Skill[] = [
    {
      "icon": "fa-solid fa-code fa-xl",
      "title": "Frontend y Backend",
      "description": "Amplia experiencia trabajando con tecnologías como Angular, React, jQuery, Spring Boot y PHP, tanto en el desarrollo frontend como en el backend."
    },
    {
      "icon": "fa-solid fa-database fa-xl",
      "title": "Bases de Datos",
      "description": "Experiencia sólida con bases de datos SQL, como MySQL, PostgreSQL y SQL Server, incluyendo diseño, consultas avanzadas y optimización."
    },
    {
      "icon": "fa-solid fa-users fa-xl",
      "title": "Liderazgo",
      "description": "Como Coordinador de Desarrollo, he liderando equipos bajo metodologías como Scrum, y gestionando proyectos de software de principio a fin."
    }
  ]
}

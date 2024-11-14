import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {


  public fakeResponse = [
    {
      id: 1,
      url: 'www.google.com',
      icon: 'fa-solid fa-globe'
    },
    {
      id: 2,
      url: 'www.google.com',
      icon: 'fa-brands fa-github'
    },
    {
      id: 3,
      url: 'www.google.com',
      icon: 'fa-brands fa-instagram'
    },
    {
      id: 4,
      url: 'https://xboxgamertag.com/search/Lohanz3943',
      icon: 'fa-brands fa-xbox'
    }
  ]
}

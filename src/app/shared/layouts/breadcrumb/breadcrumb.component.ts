import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from './services/breadcrumb.service';

@Component({
  selector: 'breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {

  private service = inject(BreadcrumbService);

  public breadcrumbs = computed(() => {
    return this.service.breadcrumb();
  });


}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RealWorldApiService } from '../../real-world-api-service/real-world-api-service';

@Component({
  selector: 'app-tags-sidebar',
  standalone: false,
  templateUrl: './tags-sidebar.html',
  styleUrl: './tags-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsSidebar {
  private api = inject(RealWorldApiService);
  // Caching/sharing lives in the service now (shareReplay), so just read it.
  readonly tags$: Observable<string[]> = this.api.getTags();
}

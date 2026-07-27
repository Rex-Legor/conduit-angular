import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { RealWorldApiService } from '../../real-world-api-service/real-world-api-service';

@Component({
  selector: 'app-tags-sidebar',
  standalone: false,
  templateUrl: './tags-sidebar.html',
  styleUrl: './tags-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsSidebar {
  api = inject(RealWorldApiService);
  readonly tags$: Observable<string[]> = this.api.getTags().pipe(
    shareReplay({
      bufferSize: 1,
      refCount: true,
    }),
  );
}

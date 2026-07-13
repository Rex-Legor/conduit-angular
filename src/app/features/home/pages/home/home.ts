import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RealWorldApiService } from '../../../../shared/real-world-api-service/real-world-api-service';
import { Observable, catchError, of } from 'rxjs';
import { Article, ArticleApiResponse } from '../../../../shared/models/article.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  currentOffset = signal(0);
  error = signal<string | null>(null);
  articlesData$: Observable<ArticleApiResponse>;

  constructor(private api: RealWorldApiService) {
    this.articlesData$ = this.api.getArticles({ limit: 20, offset: this.currentOffset() }).pipe(
      catchError(() => {
        this.error.set('Unable to load articles. Please try again.');
        return of<ArticleApiResponse>({ articlesCount: 0, articles: [] } as ArticleApiResponse);
      }),
    );
  }
}

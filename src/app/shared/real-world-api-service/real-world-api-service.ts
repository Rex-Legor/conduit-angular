import { inject, Service } from '@angular/core';
import { ApiService } from '../services/api-service/api-service';
import { ApiResponse } from '../models/api-response.model';
import { map, Observable } from 'rxjs';
import { Article, ArticleQueryParams } from '../models/article.model';

@Service()
export class RealWorldApiService {
  api = inject(ApiService);

  getTags(): Observable<string[]> {
    return this.api.get<ApiResponse<string[]>>('/tags').pipe(map((res) => res['tags']));
  }

  getArticles(params?: Partial<ArticleQueryParams>): Observable<Article[]> {
    const record: Record<string, string | number | boolean | undefined> = { ...params };
    return this.api
      .get<ApiResponse<Article[]>>('/articles', record)
      .pipe(map((res) => res['articles']));
  }

  getArticle(slug: string): Observable<Article> {
    return this.api
      .get<ApiResponse<Article>>(`/articles/${slug}`)
      .pipe(map((res) => res['article']));
  }
}

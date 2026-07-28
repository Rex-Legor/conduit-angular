import { inject, Service } from '@angular/core';
import { ApiService } from '../services/api-service/api-service';
import { ApiResponse } from '../models/api-response.model';
import { map, Observable, shareReplay } from 'rxjs';
import { Article, ArticleApiResponse, ArticleQueryParams } from '../models/article.model';
import { User } from '../models/user.model';

@Service()
export class RealWorldApiService {
  api = inject(ApiService);

  // Popular tags rarely change, so fetch once and share the result app-wide.
  // so navigating away and back doesn't trigger a refetch.
  private tags$ = this.api.get<ApiResponse<string[]>>('/tags').pipe(
    map((res) => res['tags']),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  getTags(): Observable<string[]> {
    return this.tags$;
  }

  getArticles(params?: Partial<ArticleQueryParams>): Observable<ArticleApiResponse> {
    const record: Record<string, string | number | boolean | undefined> = { ...params };
    return this.api
      .get<ArticleApiResponse>('/articles', record);
  }

  getArticle(slug: string): Observable<Article> {
    return this.api
      .get<ApiResponse<Article>>(`/articles/${slug}`)
      .pipe(map((res) => res['article']));
  }

  getFeed(params?: Partial<ArticleQueryParams>): Observable<ArticleApiResponse> {
    const record: Record<string, string | number | boolean | undefined> = { ...params };
    return this.api
      .get<ArticleApiResponse>('/articles/feed', record);
  }


  register(username: string, email: string, password: string): Observable<User> {
    return this.api
      .post<ApiResponse<User>>('/users', {
        user: {
          username,
          email,
          password,
        },
      })
      .pipe(map((res) => res['user']));
  }
}

import { inject, Service } from '@angular/core';
import { ApiService } from '../services/api-service/api-service';
import { ApiResponse } from '../models/api-response.model';
import { map, Observable } from 'rxjs';
import { Article, ArticleApiResponse, ArticleQueryParams } from '../models/article.model';
import { User } from '../models/user.model';

@Service()
export class RealWorldApiService {
  api = inject(ApiService);

  getTags(): Observable<string[]> {
    return this.api.get<ApiResponse<string[]>>('/tags').pipe(map((res) => res['tags']));
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

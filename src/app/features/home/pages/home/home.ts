import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { RealWorldApiService } from '../../../../shared/real-world-api-service/real-world-api-service';
import { ArticleApiResponse } from '../../../../shared/models/article.model';
import { AuthService } from '../../../../shared/services/auth-service/auth-service';

type SelectedTab = 'global' | 'feed';
const PAGE_SIZE = 20;

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private api = inject(RealWorldApiService);
  private auth = inject(AuthService);

  private currentOffset = signal(0);
  error = signal<string | null>(null);

  // null = the user hasn't explicitly picked a tab -> follow the auth-based default.
  private selection$ = new BehaviorSubject<SelectedTab | null>(null);

  readonly isAuthenticated$ = this.auth.isAuthenticated$;

  // Single source of truth for the active tab: an explicit choice when there is one,
  // otherwise the default (Your Feed when authenticated, Global Feed otherwise).
  // Unauthenticated users can never land on 'feed'.
  readonly activeTab$: Observable<SelectedTab> = combineLatest([
    this.isAuthenticated$,
    this.selection$,
  ]).pipe(
    map(([isAuthenticated, selection]) => {
      if (!isAuthenticated) return 'global';
      return selection ?? 'feed';
    }),
    distinctUntilChanged(),
  );

  // switchMap tears down the in-flight request (aborts the XHR) when the tab changes.
  readonly articlesData$: Observable<ArticleApiResponse> = this.activeTab$.pipe(
    tap(() => this.error.set(null)), // clear any prior error before each fetch
    switchMap((tab) => this.loadTab(tab)),
  );

  selectGlobalTab(): void {
    this.currentOffset.set(0);
    this.selection$.next('global');
  }

  selectFeedTab(): void {
    this.currentOffset.set(0);
    this.selection$.next('feed');
  }

  private loadTab(tab: SelectedTab): Observable<ArticleApiResponse> {
    const params = { limit: PAGE_SIZE, offset: this.currentOffset() };
    const request$ = tab === 'feed' ? this.api.getFeed(params) : this.api.getArticles(params);

    return request$.pipe(
      catchError(() => {
        this.error.set('Unable to load articles. Please try again.');
        return of<ArticleApiResponse>({ articlesCount: 0, articles: [] });
      }),
    );
  }
}

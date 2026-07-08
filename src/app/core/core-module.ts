import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { API_BASE_URL } from '../shared/api-token';
import { environment } from '../../environments/environment';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    // HttpClientModule is deprecated, using this instead
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: API_BASE_URL,
      useValue: environment.apiUrl,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('CoreModule is already loaded. Import it in AppModule only.');
    }
  }
}

import {
  inject,
  NgModule,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { CoreModule } from './core/core-module';
import { SharedModule } from './shared/shared-module';
import { AppRoutingModule } from './app-routing-module';
import { AuthService } from './shared/services/auth-service/auth-service';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, CoreModule, SharedModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAppInitializer(() => inject(AuthService).hydrate()),
  ],
  bootstrap: [App],
})
export class AppModule {}

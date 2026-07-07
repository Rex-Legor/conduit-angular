import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('CoreModule is already loaded. Import it in AppModule only.');
    }
  }
}

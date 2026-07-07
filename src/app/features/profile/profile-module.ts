import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing-module';
import { Profile } from './pages/profile/profile';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [Profile],
  imports: [SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}

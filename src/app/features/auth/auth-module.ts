import { NgModule } from '@angular/core';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AuthRoutingModule } from './auth-routing-module';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [Login, Register],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}

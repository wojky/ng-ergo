import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing.module';
import { AuthShell } from './auth-shell';

@NgModule({
  declarations: [AuthShell],
  imports: [AuthRoutingModule],
  providers: [],
  exports: [],
})
export class AuthModule {}

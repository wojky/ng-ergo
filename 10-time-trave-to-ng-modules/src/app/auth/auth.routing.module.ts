import { RouterModule, Routes } from '@angular/router';
import { AuthShell } from './auth-shell';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AuthShell,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

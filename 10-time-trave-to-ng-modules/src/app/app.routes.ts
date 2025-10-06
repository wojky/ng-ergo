import { RouterModule, Routes } from '@angular/router';
import { RickAndMortyShell } from './rick-and-morty/rick-and-morty-shell';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routing.module').then((m) => m.AuthRoutingModule),
  },
  {
    path: 'apps',
    children: [
      {
        path: 'rick-and-morty',
        component: RickAndMortyShell,
        loadChildren: () =>
          import('./rick-and-morty/rick-and-morty.routes').then((m) => m.RickAndMortyRoutingModule),
      },
      {
        path: 'rick-and-morty-game',
        loadChildren: () => import('./game/rick-and-morty-game.routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: 'rxjs',
    loadComponent() {
      return import('./rxjs/rxjs.component').then((c) => c.RxJsComponent);
    },
  },
  {
    path: '**',
    redirectTo: 'apps/rick-and-morty',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

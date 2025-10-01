import { Routes } from '@angular/router';
import { RickAndMortyShell } from './rick-and-morty/rick-and-morty-shell';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'apps',
    children: [
      {
        path: 'rick-and-morty',
        component: RickAndMortyShell,
        loadChildren: () => import('./rick-and-morty/rick-and-morty.routes').then((m) => m.routes),
      },
      {
        path: 'rick-and-morty-game',
        loadChildren: () => import('./game/rick-and-morty-game.routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'apps/rick-and-morty',
  },
];

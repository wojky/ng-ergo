import { Routes } from '@angular/router';
import { CharacterList } from './rick-and-morty/character-list/character-list';
import { Auth } from './auth/auth';
import { RickAndMortyShell } from './rick-and-morty/rick-and-morty-shell';
import { RickAndMortyGameShell } from './game/rick-and-morty-game.shell';

export const routes: Routes = [
  {
    path: 'auth',
    component: Auth,
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
        component: RickAndMortyGameShell,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

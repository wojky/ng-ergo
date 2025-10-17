import { CanActivateFn, RedirectCommand, Router, Routes } from '@angular/router';
import { RickAndMortyGameShell } from './rick-and-morty-game-shell';
import { GameConfig } from './config/game-config';
import { GameBoard } from './board/game-board';
import { GameLanding } from './landing';
import { GameConfigService } from './config/game-config.service';
import { GameContainer } from './config/game-container';
import { inject } from '@angular/core';

const canActivateGameBoard: CanActivateFn = () => {
  const service = inject(GameConfigService);
  const router = inject(Router);
  const path = router.parseUrl('/apps/game/play/config');

  return service.config().gameStatus === 'in-progress' ? true : new RedirectCommand(path);
};

export const routes: Routes = [
  {
    path: '',
    component: RickAndMortyGameShell,
    children: [
      {
        path: '',
        component: GameLanding,
      },
      {
        path: 'play',
        component: GameContainer,
        providers: [GameConfigService],
        children: [
          {
            path: 'config',
            component: GameConfig,
          },
          {
            path: 'board',
            component: GameBoard,
            canActivate: [canActivateGameBoard],
          },
          {
            path: '**',
            redirectTo: 'config',
          },
        ],
      },
      {
        path: 'hall-of-fame',
        loadComponent: () => import('./hall-of-fame/hall-of-fame').then((c) => c.HallOfFame),
      },
    ],
  },
];

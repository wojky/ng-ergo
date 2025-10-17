import { Injectable, signal } from '@angular/core';

type GameConfig = {
  gameStatus: 'not-started' | 'in-progress' | 'completed';
  difficulty: 'easy' | 'normal' | 'hard';
  playerName: string;
};

@Injectable()
export class GameConfigService {
  #config = signal<GameConfig>({
    gameStatus: 'not-started',
    playerName: '',
    difficulty: 'normal',
  });

  config = this.#config.asReadonly();

  startNewGame() {
    this.#config.set({
      gameStatus: 'in-progress',
      playerName: 'Player1',
      difficulty: 'normal',
    });
  }

  resetGame() {
    this.#config.set({
      gameStatus: 'not-started',
      playerName: '',
      difficulty: 'normal',
    });
  }
}

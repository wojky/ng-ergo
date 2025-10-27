import { effect, Injectable, signal } from '@angular/core';
import { GameConfig } from '../config/game-config.service';

@Injectable({
  providedIn: 'root',
})
export class HallOfFameService {
  #localStorageKey = 'hall-of-fame';
  #hallOfFame = signal<{ name: string; turns: number; difficulty: GameConfig['difficulty'] }[]>(
    JSON.parse(localStorage.getItem(this.#localStorageKey) || '[]'),
  );
  hallOfFame = this.#hallOfFame.asReadonly();

  saveHighscores = effect(() => {
    const data = JSON.stringify(this.#hallOfFame());
    localStorage.setItem(this.#localStorageKey, data);
  });

  addEntry(name: string, turns: number, difficulty: GameConfig['difficulty']) {
    this.#hallOfFame.update((entries) => [...entries, { name, turns, difficulty }]);
  }

  reset() {
    this.#hallOfFame.set([]);
    localStorage.removeItem(this.#localStorageKey);
  }
}

import { Injectable } from '@angular/core';
import { GameConfig } from '../config/game-config.service';
import { shuffleArray } from '../../shared/utils/shuffle';

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  getGridSize(difficulty: GameConfig['difficulty']) {
    switch (difficulty) {
      case 'easy':
        return { columns: 4, rows: 4 };
      case 'normal':
        return { columns: 6, rows: 4 };
      case 'hard':
        return { columns: 6, rows: 6 };
    }
  }

  getCards(characters: { id: number; img: string }[]) {
    const cards = characters.map((c) => {
      return {
        img: c.img,
        characterId: c.id,
        matched: false,
        visible: false,
      };
    });

    return shuffleArray(
      [...cards, ...cards].map((c, i) => {
        return {
          ...c,
          id: i + 1,
        };
      }),
    );
  }
}

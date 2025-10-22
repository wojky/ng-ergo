import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { GameConfigService } from '../config/game-config.service';
import { NgStyle } from '@angular/common';
import { shuffleArray } from '../../shared/utils/shuffle';

@Component({
  selector: 'app-game-board',
  imports: [NgStyle],
  template: `
    @let size = getGridSize();

    <h1>Turn #{{ turns().length }}</h1>
    <div class="grid" style="--columns: {{ size.columns }}; --rows: {{ size.rows }}">
      @for (card of cards(); track $index) {
        <button class="card" (click)="onCardClick(card)" [disabled]="card.matched">
          <div
            [style.opacity]="card.visible ? 1 : 0"
            [ngStyle]="{ 'background-image': 'url(' + card.img + ')' }"
          ></div>
        </button>
      }
    </div>
  `,
  styles: `
    .grid {
      display: grid;
      width: fit-content;
      grid-template-columns: repeat(var(--columns), 1fr);
      grid-template-rows: repeat(var(--rows), 1fr);
    }

    .card {
      border: 1px solid black;
      width: 100px;
      height: 100px;
      cursor: pointer;
    }

    .card div {
      background-size: cover;
      background-position: center;
      height: 100%;
    }
  `,
})
export class GameBoard {
  service = inject(GameConfigService);

  characters = input.required<{ id: number; img: string }[]>();
  turns = signal<{ id: number }[][]>([]);
  cards = linkedSignal(() => {
    const cards = this.characters().map((c) => {
      return {
        ...c,
        matched: false,
        visible: true,
      };
    });

    return shuffleArray([...cards, ...cards]);
  });

  ngOnInit() {
    this.newTurn();
  }

  onCardClick(card: { id: number; matched: boolean; visible: boolean }) {
    console.log('Card clicked:', card);

    // todo: start here
  }

  newTurn() {
    this.turns.update((turns) => [...turns, []]);
  }

  getGridSize() {
    const difficulty = this.service.config().difficulty;
    switch (difficulty) {
      case 'easy':
        return { columns: 4, rows: 4 };
      case 'normal':
        return { columns: 6, rows: 4 };
      case 'hard':
        return { columns: 6, rows: 6 };
    }
  }
}

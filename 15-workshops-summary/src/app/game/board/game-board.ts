import { Component, computed, effect, inject, input, linkedSignal, signal } from '@angular/core';
import { GameConfigService } from '../config/game-config.service';
import { NgStyle } from '@angular/common';
import { shuffleArray } from '../../shared/utils/shuffle';
import { Router } from '@angular/router';
import { HallOfFameService } from '../hall-of-fame/hall-of-fame.service';
import { GameBoardService } from './game-board.service';
import { map, Subject, takeUntil, timer } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

export type Card = {
  id: number;
  img: string;
  characterId: number;
  matched: boolean;
  visible: boolean;
};

export function secondsToMMSS(seconds: number): string {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

@Component({
  selector: 'app-game-board',
  imports: [NgStyle],
  template: `
    @let size = boardService.getGridSize(service.config().difficulty);

    <h1>
      Turn #{{ turns().length }} |
      @if (service.config().gameType === 'countdown') {
        Countdown: {{ countdownFrom() }}
      } @else {
        Time: {{ mmSStimer() }}
      }
    </h1>
    <p>Turn completed: {{ isTurnCompleted() }} | Game completed: {{ isGameCompleted() }}</p>
    <div class="grid" style="--columns: {{ size.columns }}; --rows: {{ size.rows }}">
      @for (card of cards(); track $index) {
        <button class="card" (click)="onCardClick(card)" [disabled]="card.matched">
          {{ card.characterId }}
          <div
            [style.opacity]="card.visible || card.matched ? 1 : 0"
            [ngStyle]="{
              'background-image': 'url(' + card.img + ')',
              cursor: card.matched ? 'default' : 'pointer',
            }"
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
  boardService = inject(GameBoardService);
  service = inject(GameConfigService);
  hallOfFameService = inject(HallOfFameService);
  router = inject(Router);

  gameOver$ = new Subject<void>();

  mmSStimer = toSignal(
    timer(0, 1000).pipe(
      map((seconds) => {
        return secondsToMMSS(seconds);
      }),
    ),
    { initialValue: '00:00' },
  );

  countdownFrom = toSignal(
    timer(0, 1000).pipe(
      takeUntil(this.gameOver$),
      map((seconds) => {
        return secondsToMMSS(
          this.service.config().countdown! - seconds - 1 >= 0
            ? this.service.config().countdown! - seconds
            : 0,
        );
      }),
    ),
    { initialValue: secondsToMMSS(this.service.config().countdown!) },
  );

  countdownFromEffect = effect(() => {
    if (this.countdownFrom() === '00:00') {
      setTimeout(() => {
        // to allow UI to update
        this.gameOver$.next();
        alert('Time is up! Game over.');
        this.router.navigate(['/apps/game/hall-of-fame']);
      }, 0);
    }
  });

  characters = input.required<{ id: number; img: string }[]>();
  turns = signal<
    {
      first: { id: number; characterId: number } | null;
      second: { id: number; characterId: number } | null;
    }[]
  >([]);

  isTurnCompleted = computed(() => {
    const currentTurn = this.turns().at(-1);
    return !!(currentTurn?.first && currentTurn?.second);
  });

  isGameCompleted = computed(() => {
    return this.cards().every((card) => card.matched);
  });

  isGameCompletedEffect = effect(() => {
    if (!this.isGameCompleted()) return;

    setTimeout(() => {
      // to allow UI to update
      alert('Congratulations! You have completed the game');
      this.hallOfFameService.addEntry(
        this.service.config().playerName,
        this.turns().length,
        this.service.config().difficulty,
      );

      this.router.navigate(['/apps/game/hall-of-fame']);
    }, 300);
  });

  cards = linkedSignal<Card[]>(() => {
    return this.boardService.getCards(this.characters());
  });

  ngOnInit() {
    this.newTurn();
  }

  onCardClick(selectedCard: {
    id: number;
    characterId: number;
    matched: boolean;
    visible: boolean;
  }) {
    if (this.isTurnCompleted()) {
      this.newTurn();
    }

    const currentTurn = this.turns().at(-1);

    if (!currentTurn) {
      throw new Error('No current turn found');
    }

    if (!currentTurn?.first) {
      this.cards.update((cards) => {
        return cards.map((c) => {
          return {
            ...c,
            visible: c.id === selectedCard.id || selectedCard.matched,
          };
        });
      });

      this.turns.update((turns) => {
        turns.pop();
        return [
          ...turns,
          {
            first: { id: selectedCard.id, characterId: selectedCard.characterId },
            second: null,
          },
        ];
      });
    }

    if (currentTurn.first) {
      const matched = currentTurn.first.characterId === selectedCard.characterId;

      this.cards.update((cards) => {
        return cards.map((c) => {
          return {
            ...c,
            visible:
              currentTurn.first?.id === c.id || c.id === selectedCard.id || selectedCard.matched,
            matched: c.matched || (matched && currentTurn.first?.characterId === c.characterId),
          };
        });
      });

      this.turns.update((turns) => {
        turns.pop();

        return [
          ...turns,
          {
            first: currentTurn.first,
            second: { id: selectedCard.id, characterId: selectedCard.characterId },
          },
        ];
      });
    }
  }

  newTurn() {
    this.turns.update((turns) => [...turns, { first: null, second: null }]);
  }
}

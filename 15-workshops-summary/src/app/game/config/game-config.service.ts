import { inject, Injectable, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

export type GameConfig = {
  gameStatus: 'not-started' | 'in-progress' | 'completed';
  difficulty: 'easy' | 'normal' | 'hard';
  playerName: string;
  gameType: 'freeplay' | 'countdown';
  countdown?: number;
};

@Injectable()
export class GameConfigService {
  private formBuilder = inject(NonNullableFormBuilder);

  #config = signal<GameConfig>({
    gameStatus: 'not-started',
    playerName: '',
    difficulty: 'normal',
    gameType: 'freeplay',
    countdown: 60,
  });

  config = this.#config.asReadonly();

  createConfigForm() {
    const form = this.formBuilder.group({
      playerName: this.formBuilder.control('', [Validators.required]),
      difficulty: this.formBuilder.control<'easy' | 'normal' | 'hard'>('normal'),
      gameType: this.formBuilder.control<'freeplay' | 'countdown'>('freeplay'),
      countdown: this.formBuilder.control<number>({ value: 60, disabled: true }, [
        Validators.min(30),
      ]),
    });

    form.controls.gameType.valueChanges
      .pipe
      // to do
      ()
      .subscribe((value) => {
        if (value === 'countdown') {
          form.controls.countdown.enable();
        } else {
          form.controls.countdown.disable();
        }
      });

    return form;
  }

  startNewGame(settings: ReturnType<ReturnType<typeof this.createConfigForm>['getRawValue']>) {
    this.#config.set({
      gameStatus: 'in-progress',
      playerName: settings.playerName,
      difficulty: settings.difficulty,
      gameType: settings.gameType,
      countdown: settings.countdown,
    });
  }

  resetGame() {
    this.#config.set({
      gameStatus: 'not-started',
      playerName: '',
      difficulty: 'normal',
      gameType: 'freeplay',
      countdown: 60,
    });
  }
}

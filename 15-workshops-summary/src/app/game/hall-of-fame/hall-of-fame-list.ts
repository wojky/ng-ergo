import { Component, input } from '@angular/core';
import { GameConfig } from '../config/game-config.service';

export type HallOfFameLists = Record<GameConfig['difficulty'], { name: string; turns: number }[]>;

@Component({
  selector: 'app-hall-of-fame-list',
  template: `
    <ol>
      @for (entry of lists(); track $index) {
        <li>{{ $index + 1 }}. {{ entry.name }} - {{ entry.turns }} turns</li>
      }
    </ol>
  `,
})
export class HallOfFameList {
  lists = input.required<HallOfFameLists[keyof HallOfFameLists]>();
}

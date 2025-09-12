import { Component, input, output } from '@angular/core';
import { Character } from '../character.contract';

export type CharacterItemChildMessagePayload = {
  characterId: number;
};

@Component({
  selector: 'app-character-item',
  imports: [],
  template: `
    <p>
      {{ item().name }}
    </p>
  `,
  styles: ``,
})
export class CharacterItem {
  item = input.required<Character>();

  childMessage = output<CharacterItemChildMessagePayload>();

  constructor() {
    setTimeout(() => {
      this.childMessage.emit({ characterId: this.item().id });
    }, 3000);
  }
}

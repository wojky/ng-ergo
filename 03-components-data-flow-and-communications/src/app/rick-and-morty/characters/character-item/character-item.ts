import { Component, effect, inject, input, model, output, signal } from '@angular/core';
import { Character } from '../character.contract';
import { CharacterList } from '../character-list';
import { Rating } from '../../../shared/ui/rating';

export type CharacterItemChildMessagePayload = {
  characterId: number;
};

@Component({
  selector: 'app-character-item',
  imports: [Rating],
  template: `
    <div style="display: flex; align-items: center; gap: 8px;">
      <p>{{ item().name }}</p>
      <app-rating [(rating)]="rating" />
    </div>
  `,
  styles: ``,
})
export class CharacterItem {
  item = input.required<Character>();
  modelExample = model('');

  rating = signal(0);

  e = effect(() => {
    console.log('Child model changed:', this.rating());
  });

  childMessage = output<CharacterItemChildMessagePayload>();

  parentComponent = inject(CharacterList, { optional: true });

  constructor() {
    setTimeout(() => {
      this.modelExample.update((value) => value.toUpperCase());
      // this.parentComponent.onChildMessage({ characterId: this.item().id });
      // this.childMessage.emit({ characterId: this.item().id });
    }, 3000);
  }
}

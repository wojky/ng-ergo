import {
  Component,
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  Input,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { Character } from '../character.contract';
import { CharacterList } from '../character-list';

export type CharacterItemChildMessagePayload = {
  characterId: number;
};

@Component({
  selector: 'app-character-item',
  standalone: false,
  template: `
    <div style="display: flex; align-items: center; gap: 8px;">
      <p appCopyToClipboard>{{ item.name }}</p>
    </div>
    <app-rating [(rating)]="rating" />
    <a [routerLink]="[item.id]">
      <figure style="max-width: 150px;">
        <img style="width: 100%;" [src]="item.image" [alt]="item.name" />
      </figure>
    </a>
  `,
  styles: ``,
})
export class CharacterItem {
  @Input() item!: Character;
  modelExample = model('');

  @Input() rating = 0;
}

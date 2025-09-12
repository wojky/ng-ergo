import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { CharacterApiResponseSchema } from './character.contract';
import { validate } from '../../shared/validate';
import { CharacterItem, CharacterItemChildMessagePayload } from './character-item/character-item';

@Component({
  selector: 'app-character-list',
  imports: [CharacterItem],
  template: `
    <ul>
      @if (charactersResource.hasValue() && charactersResource.value(); as response) {
        @for (character of response.results; track character.id) {
          <li>
            <app-character-item (childMessage)="onChildMessage($event)" [item]="character" />
          </li>
        } @empty {
          <p>This list is empty</p>
        }
      } @else if (charactersResource.isLoading()) {
        <p>Loading...</p>
      } @else if (charactersResource.error(); as error) {
        <p>Error!</p>
      }
    </ul>
  `,
  styles: ``,
})
export class CharacterList {
  name = signal('');

  readonly url = 'https://rickandmortyapi.com/api/character';

  onChildMessage(payload: CharacterItemChildMessagePayload) {
    console.log('Message from child:', payload);
  }

  charactersResource = httpResource(
    () => {
      return {
        method: 'GET',
        url: this.url,
        params: {
          name: this.name(),
        },
      };
    },
    {
      parse: validate(CharacterApiResponseSchema, this.url),
    },
  );
}

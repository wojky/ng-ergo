import { httpResource } from '@angular/common/http';
import { Component, effect, signal } from '@angular/core';
import { CharacterApiResponseSchema } from './character.contract';
import { validate } from '../../shared/validate';
import { CharacterItem, CharacterItemChildMessagePayload } from './character-item/character-item';

@Component({
  selector: 'app-character-list',
  imports: [CharacterItem],
  template: `
    {{ parentModel() }}
    <ul>
      @if (charactersResource.hasValue() && charactersResource.value(); as response) {
        @for (character of response.results; track character.id) {
          <li>
            <app-character-item
              (childMessage)="onChildMessage($event)"
              [(modelExample)]="parentModel"
              [item]="character"
            />
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

  parentModel = signal('from parent');

  e = effect(() => {
    console.log('Parent model changed:', this.parentModel());
  });

  readonly url = 'https://rickandmortyapi.com/api/character';

  onChildMessage(payload: CharacterItemChildMessagePayload) {
    console.log('Message from child:', payload);
  }

  protected charactersResource = httpResource(
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

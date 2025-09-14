import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { CharacterApiResponseSchema } from './character.contract';
import { validate } from '../../shared/validate';
import { CharacterItem, CharacterItemChildMessagePayload } from './character-item/character-item';
import { Filters, FiltersState } from '../../shared/ui/filters';

@Component({
  selector: 'app-character-list',
  imports: [CharacterItem, Filters],
  template: `
    <app-filters (newSearch)="search($event)" />
    <div style="display: flex; gap: 16px; flex-wrap: wrap">
      @if (charactersResource.hasValue() && charactersResource.value(); as response) {
        @for (character of response.results; track character.id) {
          <app-character-item
            (childMessage)="onChildMessage($event)"
            [(modelExample)]="parentModel"
            [item]="character"
          />
        } @empty {
          <p>This list is empty</p>
        }
      } @else if (charactersResource.isLoading()) {
        <p>Loading...</p>
      } @else if (charactersResource.error(); as error) {
        <p>Error!</p>
      }
    </div>
  `,
  styles: ``,
})
export class CharacterList {
  name = signal('');

  parentModel = signal('from parent');

  search(filters: FiltersState) {
    this.name.set(filters.name);
  }

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

import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';

export type ApiResponse = {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: Character[];
};

export type Character = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-character-list',
  imports: [],
  template: `
    <ul>
      @if (charactersResource.hasValue() && charactersResource.value(); as response) {
        @for (character of response.results; track character.id) {
          <li>{{ character.name }} {{ $even }} {{ $odd }}</li>
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

  charactersResource = httpResource<ApiResponse>(() => {
    return {
      method: 'GET',
      url: 'https://rickandmortyapi.com/api/character',
      params: {
        name: this.name(),
      },
    };
  });
}

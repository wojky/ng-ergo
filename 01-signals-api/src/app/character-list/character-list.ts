import { HttpClient, httpResource } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';

export type ApiResponse = {
  info: any;
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
    <p>character-list works!</p>
    <!-- <ul>
      @for (character of characters(); track character.id) {
        <li>{{ character.name }}</li>
      } @empty {
        <p>Loading...</p>
      }
    </ul> -->

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
  // http = inject(HttpClient);
  // characters = signal<Character[]>([]);

  name = signal('rick');

  constructor() {
    effect(() => {
      console.log({
        error: this.charactersResource.error(),
        isLoading: this.charactersResource.isLoading(),
        hasValue: this.charactersResource.hasValue(),
        value: this.charactersResource.hasValue() && this.charactersResource.value(),
      });
    });
  }

  charactersResource = httpResource<ApiResponse>(
    () => 'https://rickandmortyapi.com/api/character?name=' + this.name(),
  );

  // more complex httpResource example
  // charactersResource = httpResource<ApiResponse>(() => {
  //   return {
  //     method: 'POST',
  //     url: 'https://rickandmortyapi.com/api/character',
  //     params: {
  //       name: this.name(),
  //     },
  //   };
  // });

  // constructor() {
  //   this.http
  //     .get<ApiResponse>('https://rickandmortyapi.com/api/character?name=afefwgwgw')
  //     .subscribe((res) => {
  //       // validate response
  //       console.log(res);
  //       this.characters.set(res.results);
  //     });
  // }
}

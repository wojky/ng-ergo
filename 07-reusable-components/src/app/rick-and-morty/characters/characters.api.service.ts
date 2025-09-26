import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { validate } from '../../shared/validate';
import { CharacterApiResponseSchema } from './character.contract';

@Injectable({
  providedIn: 'root',
})
export class CharactersApiService {
  private name = signal('');

  private readonly url = 'https://rickandmortyapi.com/api/character';

  #charactersResource = httpResource(
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

  charactersResource = this.#charactersResource.asReadonly();

  updateFilters(name: string) {
    this.name.set(name);
  }

  refresh() {
    this.#charactersResource.reload();
  }
}

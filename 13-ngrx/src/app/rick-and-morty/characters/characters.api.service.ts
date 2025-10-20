import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { validate } from '../../shared/validate';
import { CharacterApiResponseSchema } from './character.contract';

export type CharactersFilters = {
  name: string;
  page: number;
};

@Injectable({
  providedIn: 'root',
})
export class CharactersApiService {
  #url = 'https://rickandmortyapi.com/api/character';
  #filters = signal<CharactersFilters>({ name: '', page: 1 });

  #charactersResource = httpResource(
    () => {
      const { name, page } = this.#filters();

      return {
        method: 'GET',
        url: this.#url,
        params: {
          name,
          page: page,
        },
      };
    },
    {
      parse: validate(CharacterApiResponseSchema, this.#url),
    },
  );

  charactersResource = this.#charactersResource.asReadonly();
  filters = this.#filters.asReadonly();

  updateFilters(filters: Partial<CharactersFilters>) {
    this.#filters.update((current) => {
      return { ...current, ...filters };
    });
  }

  refresh() {
    this.#charactersResource.reload();
  }
}

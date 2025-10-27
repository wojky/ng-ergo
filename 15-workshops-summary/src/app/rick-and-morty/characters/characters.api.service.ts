import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { validate } from '../../shared/validate';
import { CharacterApiResponseSchema } from './character.contract';
import { patchState, signalState } from '@ngrx/signals';

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

  #filtersv2 = signalState<CharactersFilters>({
    name: '',
    page: 1,
  });

  constructor() {
    this.#filtersv2.name();
  }

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
    patchState(this.#filtersv2, {
      page: 3,
    });

    this.#filters.update((current) => {
      return { ...current, ...filters };
    });
  }

  refresh() {
    this.#charactersResource.reload();
  }
}

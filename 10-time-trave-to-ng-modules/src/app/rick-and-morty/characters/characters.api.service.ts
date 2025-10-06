import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CharacterApiResponse } from './character.contract';
import { BehaviorSubject, catchError, combineLatest, map, of, switchMap, tap } from 'rxjs';

export type CharactersFilters = {
  name: string;
  page: number;
};

@Injectable({
  providedIn: 'root',
})
export class CharactersApiService {
  #url = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  #filters = new BehaviorSubject<CharactersFilters>({ name: '', page: 1 });
  #isLoading = new BehaviorSubject(false);
  #isError = new BehaviorSubject(false);
  #hasValue = new BehaviorSubject(false);

  charactersApiState = combineLatest([
    this.#isLoading.asObservable(),
    this.#isError.asObservable(),
    this.#hasValue.asObservable(),
  ]).pipe(
    map(([isLoading, isError, hasValue]) => {
      return {
        isLoading,
        isError,
        hasValue,
      };
    }),
  );

  filters = this.#filters.asObservable();

  characters = this.#filters.pipe(
    switchMap((filters) => {
      this.#hasValue.next(false);
      this.#isError.next(false);
      this.#isLoading.next(true);
      return this.http
        .get<CharacterApiResponse>(this.#url, {
          params: { name: filters.name, page: filters.page },
        })
        .pipe(
          tap(() => {
            this.#isLoading.next(false);
            this.#hasValue.next(true);
          }),
          catchError(() => {
            this.#hasValue.next(false);
            this.#isLoading.next(false);
            this.#isError.next(true);
            return of(undefined);
          }),
        );
    }),
  );

  updateFilters(filters: Partial<CharactersFilters>) {
    this.#filters.next({
      ...this.#filters.value,
      ...filters,
    });
  }

  refresh() {
    // this.#filters.next({
    //   ...this.#filters.value,
    // });
  }
}
